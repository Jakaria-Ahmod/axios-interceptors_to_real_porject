const validateEmail = require('../helper/ValidEmail');
const { accessToken, refreshToken } = require('../middleware/jwt-varification');
const User = require('../models/user.create.model');

const userCreateController = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dateOfBirth, description } =
      req.body;

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

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      password,
      dateOfBirth,
      description,
    });
    await newUser.save();

    const payload = {
      id: newUser._id,
      email: newUser.email,
      userName: newUser.userName,
    };

    const accesToken = accessToken(payload);
    const rifrashToken = refreshToken(payload);

    // Set refresh token in cookie
    res.cookie('refreshToken', rifrashToken, {
      httpOnly: true,
      secure: false, // localhost এ false
      sameSite: 'Strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
      accessToken: accesToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = userCreateController;
