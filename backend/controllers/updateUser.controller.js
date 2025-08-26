const User = require('../models/user.create.model');

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id; //
    const updateData = req.body; //

    //
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true } // new:true
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

module.exports = updateUserController;
