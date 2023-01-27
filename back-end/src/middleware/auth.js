const jwt = require('jsonwebtoken');
const fs = require('fs');
const { errorsTypes } = require('../utils/errorsCatalog');

const jwtKey = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const auth = (req, _res, next) => {
  const token = req.headers.authorization;

  if (!token) throw new Error(errorsTypes.TOKEN_NOT_FOUND);

  try {
    const verified = jwt.verify(token, jwtKey);
    req.user = verified;
    next();
  } catch (error) {
    throw new Error(errorsTypes.INVALID_TOKEN);
  }
};

module.exports = auth;