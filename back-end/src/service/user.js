const md5 = require('md5');
const { user } = require('../database/models');
const { validateLogin } = require('../utils/validation');
const { errorsTypes } = require('../utils/errorsCatalog');
const generateToken = require('../utils/generateToken');

const login = async (email, password) => {
  validateLogin({ email, password });
  const userExist = await user.findOne({ where: { email } });
  if (!userExist) throw new Error(errorsTypes.USER_NOT_FOUND);
  const { password: userPassword } = userExist;
  if (md5(password) !== userPassword) throw new Error(errorsTypes.INVALID_PASSWORD);
  const token = generateToken(userExist);
  return {
    name: userExist.name,
    email: userExist.email,
    role: userExist.role,
    token,
  };
};

module.exports = {
  login,
};