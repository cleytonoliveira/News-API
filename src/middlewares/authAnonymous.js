const jwt = require('jsonwebtoken');

const secret = process.env.APP_KEY || 'secretofapinews';

module.exports = (req, _res, next) => {
  const { authorization: token } = req.headers;
  try {
    const { data: { sub } } = jwt.verify(token, secret);
    req.sub = sub;
    next();
  } catch (err) {
    req.sub = {
      role: 'anonymous',
    };
    next();
  }
};
