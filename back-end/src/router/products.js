const router = require('express').Router();
const productsController = require('../controller/products');

router.get('/', productsController.getAll);

module.exports = router;