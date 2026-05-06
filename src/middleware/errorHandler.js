const { ApiError } = require('../utils/ApiError');

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const apiErr = err instanceof ApiError ? err : new ApiError(500, 'INTERNAL_ERROR', 'Something went wrong');
  const status = apiErr.statusCode || 500;

  res.status(status).json({
    ok: false,
    error: {
      code: apiErr.code || 'INTERNAL_ERROR',
      message: apiErr.message,
      details: apiErr.details ?? undefined,
    },
  });
}

module.exports = { errorHandler };

