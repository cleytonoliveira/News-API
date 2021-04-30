const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');

const validateRequest = (req, next, schema) => {
  const { error, value } = schema.validate(req.body);

  if (error) error.details.map((err) => next(Boom.badRequest(err.message)));
  req.body = value;
  next();
};

module.exports = (req, _res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    summary: Joi.string().required(),
    firstParagraph: Joi.string().required(),
    body: Joi.string().required(),
    authorId: Joi.number().integer().required(),
  });
  return validateRequest(req, next, schema);
};
