const User = require('../models/user.create.model');

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

module.exports = getAlluserController;
