const userService = require('../service/user');
const statusHttp = require('../utils/statusHttp');

const login = async (req, res) => {
  const { email, password } = req.body;
  const validatedUser = await userService.login(email, password);
  res.status(statusHttp.OK).json(validatedUser);
};

const register = async (req, res) => {
  const { email, password, name } = req.body;
  const newUser = await userService.register(email, password, name);
  res.status(statusHttp.CREATED).json(newUser);
};

const getAllUser = async (_req, res) => {
  try {
    const users = await userService.getAllUser();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


module.exports = {
  login,
  register,
  getAllUser,
};
