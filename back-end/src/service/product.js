const Product = require('../database/models/product');

const getAllProducts = () => Product.findAll();

// teste

module.exports = { getAllProducts };