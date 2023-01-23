const statusHttp = require('./statusHttp');

const errorsTypes = {
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_EXIST: 'USER_EXIST',
  INVALID_PASSWORD: 'INVALID_PASSWORD',
  TOKEN_NOT_FOUND: 'TOKEN_NOT_FOUND',
  INVALID_TOKEN: 'INVALID_TOKEN',
  PROPERTY_INVALID: 'PROPERTY_INVALID',
};

const errorsCatalog = {
  USER_NOT_FOUND: {
    statusHttp: statusHttp.NOT_FOUND,
    message: 'User not found',
  },
  USER_EXIST: {
    statusHttp: statusHttp.CONFLICT,
    message: 'User already registered',
  },
  INVALID_PASSWORD: {
    statusHttp: statusHttp.UNAUTHORIZED,
    message: 'Invalid password',
  },
  TOKEN_NOT_FOUND: {
    statusHttp: statusHttp.UNAUTHORIZED,
    message: 'Token not found',
  },
  INVALID_TOKEN: {
    statusHttp: statusHttp.UNAUTHORIZED,
    message: 'Expired or invalid token',
  },
  PROPERTY_INVALID: {
    statusHttp: statusHttp.BAD_REQUEST,
    message: 'Property is not equal status',
  },
};

module.exports = { errorsTypes, errorsCatalog };