const validateEmail = require('../helper/ValidEmail');
const { accessToken, refreshToken } = require('../middleware/jwt-varification');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userCreateController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      dateOfBirth,
      description,
      active,
    } = req.body;

    // Field validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !dateOfBirth ||
      !description
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    const userName = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`;

    const existingUser = await User.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email or UserName already exists' });
    }

    const haspassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password: haspassword,
      dateOfBirth,
      description,
      role: 'user',
      active,
    });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // ✅ Set active status to true when user logs in
    user.active = true;
    await user.save();

    // Create payload for tokens
    const payload = {
      id: user._id,
      email: user.email,
      userName: user.userName,
      role: user.role,
      active: user.active,
    };

    // Generate tokens
    const accesToken = accessToken(payload);
    const rifrashToken = refreshToken(payload);

    // Set refresh token in cookie
    res.cookie('refreshToken', rifrashToken, {
      httpOnly: true,
      secure: false, // localhost এ false
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return user data along with token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      accessToken: accesToken,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteController = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(401).json({ message: 'ID NOT FOUND ' });

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User deleted successfully',
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting user',
      error: error.message,
    });
  }
};

const getAlluserController = async (req, res) => {
  try {
    const allUser = await User.find();

    res.status(200).json({
      message: 'user all get sucessfully',
      allUser: allUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshController = async (req, res) => {
  try {
    const accessToken = jwt.sign(
      { msg: 'new access token' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30s' },
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate access token' });
  }
};

const singleUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const sinGleUser = await User.findOne({ id: User._id });
    if (!sinGleUser) {
      return res.status(401).json({ message: 'User Not Found Opps Sorry' });
    }

    res.status(200).json({
      sucess: true,
      message: 'Single user ',
      sinGleUser: sinGleUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Hash password if it exists in updateData
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user',
      error: error.message,
    });
  }
};

const meController = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password'); // Exclude password from the response

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logOutController = async (req, res) => {
  try {
    // Get user id from auth middleware
    const userId = req.user?.id; // Assuming authMiddleware adds user to req

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Find user and set active to false
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set active status to false on logout
    user.active = false;
    await user.save();

    // Clear refresh token cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
    });

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  userCreateController,
  deleteController,
  getAlluserController,
  refreshController,
  singleUserController,
  updateUserController,
  loginController,
  meController,
  logOutController,
};
