const services = require('../services');

module.exports = function checkToken(req, res, next) {
  try {
    const authorization = req.get('Authorization');
    const token = authorization.replace(/^Bearer /i, '');
    const { user } = services.verifyToken(token);

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
