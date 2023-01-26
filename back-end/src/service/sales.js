const { sale } = require('../database/models');

const findAll = async () => {
  const allSales = await sale.findAll();
  return allSales;
};

module.exports = {
  findAll,
};
