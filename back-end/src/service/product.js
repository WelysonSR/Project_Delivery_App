const { product } = require('../database/models');

const getAllProducts = async () => {
const products = await product.findAll();
return products;
};

module.exports = { getAllProducts };