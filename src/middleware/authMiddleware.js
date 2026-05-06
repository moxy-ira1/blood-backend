const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { ApiError } = require('../utils/ApiError');

async function authMiddleware(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice('Bearer '.length) : null;
  if (!token) return next(new ApiError(401, 'UNAUTHORIZED', 'Missing bearer token'));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(payload.sub);
    if (!user || !user.isActive) return next(new ApiError(401, 'UNAUTHORIZED', 'Invalid token'));

    req.user = {
      id: user.id,
      role: user.role,
      btdOrganizationId: user.btdOrganizationId,
    };
    return next();
  } catch {
    return next(new ApiError(401, 'UNAUTHORIZED', 'Invalid token'));
  }
}

module.exports = { authMiddleware };

