const User = require('../models/user.create.model');

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

module.exports = singleUserController;
