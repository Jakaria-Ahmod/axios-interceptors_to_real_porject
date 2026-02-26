const jwt = require('jsonwebtoken');

// Access Token: 5 মিনিট
const accessToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
};

// Refresh Token: 7 দিন
const refreshToken = payload => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {
    expiresIn: '15d',
  });
};

// Verify Refresh Token
const verifyRefreshToken = token => {
  try {
    const verified = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
    const payload = verified.data || verified;
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: err.message };
  }
};

module.exports = { accessToken, refreshToken, verifyRefreshToken };
