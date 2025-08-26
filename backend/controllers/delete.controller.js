const User = require('../models/user.create.model');

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

module.exports = deleteController;
