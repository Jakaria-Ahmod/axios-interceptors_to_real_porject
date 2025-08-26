const jwt = require('jsonwebtoken');

const refreshController = async (req, res) => {
  try {
    const accessToken = jwt.sign(
      { msg: 'new access token' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30s' }
    );

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate access token' });
  }
};

module.exports = refreshController;
