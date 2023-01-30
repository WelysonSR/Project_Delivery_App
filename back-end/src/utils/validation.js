const joi = require('joi');
const statusHttp = require('./statusHttp');

const schemaName = joi.string().min(12).required()
  .messages({
  'string.min': '400|name must be at least 12 characters',
  'string.empty': '400|name is not allowed to be empty',
  'any.required': '400|name is a required field',
});

const schemaEmail = joi.string().email().empty().required()
  .messages({
  'string.empty': '400|The "email" field is required',
  'any.required': '400|email is required',
  'string.email': '400|Invalid email',
});

const schemaPassword = joi.string().min(6).empty().required()
  .messages({
  'string.empty': '400|The "password" field is required',
  'any.required': '400|password is required',
  'string.min': '400|password must be at least 6 characters',
});

const validateRegister = ({ name, email, password }) => {
  const schema = joi.object().keys({
    name: schemaName,
    email: schemaEmail,
    password: schemaPassword,
  });

  const { error } = schema.validate({ name, email, password });
  if (error) {
    throw new Error(`${error.message}`);
  }

  return true;
};

const validateLogin = ({ email, password }) => {
  const schema = joi.object().keys({
    email: schemaEmail,
    password: schemaPassword,
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    throw new Error(`${error.message}`);
  }

  return true;
};

const validateSale = (req, res, next) => {
  const { totalPrice, deliveryAddress, deliveryNumber, status } = req.body;
  if (!totalPrice || !deliveryAddress || !deliveryNumber || !status) {
    res.status(statusHttp.BAD_REQUEST).json({
      message: 'Missing parameters for sale',
    });
  } else {
    next();
  }
};

module.exports = {
  validateRegister,
  validateLogin,
  validateSale,
};