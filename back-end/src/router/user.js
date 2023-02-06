const router = require('express').Router();
const userController = require('../controller/user');
const auth = require('../middleware/auth');

router.get('/', userController.getAllUser);
router.post('/login', userController.login);
router.post('/register-adm', auth, userController.register);
router.post('/register', userController.register);
router.delete('/:id', auth, userController.deliteUser);

module.exports = router;