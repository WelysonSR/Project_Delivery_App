const { product } = require('../database/models');

const getAll = async () => {
  const result = await product.findAll();
  return result
};

module.exports = {
  getAll,
};