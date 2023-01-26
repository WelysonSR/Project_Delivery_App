const router = require('express').Router();
const salesController = require('../controller/sales');

router.get('/', salesController.findAll);

module.exports = router;