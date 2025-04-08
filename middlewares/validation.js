const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required()
      .messages({ "string.empty": 'The "keyword" field is required' }),
    title: Joi.string()
      .required()
      .messages({ "string.empty": 'The "title" field is required' }),
    description: Joi.string()
      .required()
      .messages({ "string.empty": 'The "text" field is required' }),
    publishedAt: Joi.string()
      .required()

      .messages({ "string.empty": 'The "date" field is required' }),
    source: Joi.object()
      .required()
      .messages({ "string.empty": 'The "source" field is required' }),
    url: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "link" field must be filled in',
      "string.uri": 'The "link" field must be a valid url',
    }),
    urlToImage: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "image" field must be filled in',
      "string.uri": 'The "image" field must be a valid url',
    }),
    isSaved: Joi.boolean()
      .required()
      .messages({ "string.empty": 'The "isSaved" field is required' }),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length for the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).messages({
      "string.min": 'The minimum length for the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateArticleId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.empty": 'The "id" field can not be empty',
      "string.length": 'The "id" field must have a length of 24',
    }),
  }),
});
