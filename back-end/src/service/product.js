const Product = require('../database/models/product');

const getAllProducts = () => {
  return Product.findAll();
};

module.exports = { getAllProducts };