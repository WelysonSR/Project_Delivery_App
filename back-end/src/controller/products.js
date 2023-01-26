const products = require('../service/products');

const getAll = async (_req, res) => {
    const validatedUser = await products.getAll();
    res.status(200).json(validatedUser);
  };

module.exports = { getAll }
  