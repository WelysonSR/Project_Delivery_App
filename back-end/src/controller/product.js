const productService = require('../service/product');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getAllProducts };