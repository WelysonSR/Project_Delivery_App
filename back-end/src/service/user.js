const md5 = require('md5');
const { user } = require('../database/models');
const { validateLogin, validateRegister } = require('../utils/validation');
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
    id: userExist.id,
    name: userExist.name,
    email: userExist.email,
    role: userExist.role,
    token,
  };
};

const register = async (email, password, name, newRole) => {
  validateRegister({ email, password, name });
  const userExist = await user.findOne({ where: { email } });
  if (userExist) throw new Error(errorsTypes.USER_EXIST);
  const hasPassword = md5(password);
  const newUser = await user.create({ name, email, password: hasPassword, role: newRole });
  const token = generateToken(newUser);
  const { role, id } = newUser;
  return {
    id,
    name,
    role,
    email,
    token,
  };
};

const getAllUser = async () => {
  const users = await user.findAll();
  return users;
};

const deliteUser = async (id) => {
  const userExist = await user.findOne({ where: { id } });
  if (!userExist) throw new Error(errorsTypes.USER_EXIST);
  const result = await user.destroy({ where: { id } });
  if (result){
    return await getAllUser();
  }
}
  
module.exports = {
  login,
  register,
  getAllUser,
  deliteUser,
};