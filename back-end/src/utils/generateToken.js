const jwt = require('jsonwebtoken');
const fs = require('fs');

const jwtKey = fs.readFileSync('./jwt.evaluation.key', { encoding: 'utf-8' });

const generateToken = (user) => {
  const { id, email, role } = user;
  const payload = {
    id,
    email,
    role,
  };

  const config = {
    expiresIn: '1d',
  };

  const token = jwt.sign(payload, jwtKey, config);

  return token;
};

module.exports = generateToken;