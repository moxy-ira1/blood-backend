const { ApiError } = require('../utils/ApiError');

function roleMiddleware(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return next(new ApiError(401, 'UNAUTHORIZED', 'Not authenticated'));
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'FORBIDDEN', 'Access denied'));
    }
    return next();
  };
}

module.exports = { roleMiddleware };

