const router = require('express').Router();
const salesController = require('../controller/sales');
const auth = require('../middleware/auth');

router.get('/', salesController.findAll);

router.get('/:id', salesController.findById);

router.patch('/:id', auth, salesController.upDateStatus);

router.post('/', auth, salesController.createSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;