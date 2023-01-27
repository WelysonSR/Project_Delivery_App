const router = require('express').Router();
const salesController = require('../controller/sales');

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.get('/:id', salesController.upDateStatus);

router.delete('/:id', salesController.deleteSale);

router.post('/:id', salesController.newSale);

module.exports = router;