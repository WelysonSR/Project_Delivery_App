const Product = require('../database/models/product');

const getAllProducts = () => {
  return Product.findAll();
};

// teste

module.exports = { getAllProducts };