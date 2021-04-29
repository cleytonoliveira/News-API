const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

const secret = process.env.APP_KEY || 'secretofapinews';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (email, userId, role = 'user') => {
  const payload = {
    iss: 'News-API',
    sub: {
      email,
      userId,
      role,
    },
  };

  return jwt.sign({ data: payload }, secret, jwtConfig);
};

const validateToken = (req, token) => {
  if (!token) return Boom.unauthorized('Token not found');

  try {
    const { data: { sub } } = jwt.verify(token, secret);
    req.sub = sub;
  } catch (err) {
    throw Boom.unauthorized('Invalid or expired token');
  }
  return true;
};

module.exports = {
  generateToken,
  validateToken,
};
