const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorize = require('../middleware/authorize');
const auth = require('../middleware/auth');

router.post('/register', auth, authorize('administrador_total'), userController.createUser);
router.post('/login', userController.login);
router.get('/', auth, authorize(['administrador_total', 'administrador_organizacion']), userController.getAllUsers);
router.get('/:id', auth, authorize(['administrador_total', 'administrador_organizacion', 'abogado']), userController.getUserById);
router.put('/:id', auth, authorize(['administrador_total', 'administrador_organizacion']), userController.updateUser);
router.delete('/:id', auth, authorize('administrador_total'), userController.deleteUser);

module.exports = router;
