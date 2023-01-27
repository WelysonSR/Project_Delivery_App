const router = require('express').Router();
const salesController = require('../controller/sales');
const validateSale = require('../utils/validate');

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.get('/:id', salesController.upDateStatus);

router.delete('/:id', salesController.deleteSale);

router.post('/', validateSale, salesController.createSale);

module.exports = router;