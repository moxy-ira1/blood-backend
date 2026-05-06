const jwt = require('jsonwebtoken');

function signJwtForUser(user) {
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(
    { role: user.role },
    process.env.JWT_SECRET,
    { subject: user.id, expiresIn }
  );
}

module.exports = { signJwtForUser };

