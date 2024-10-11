const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Ruta para obtener todos los usuarios
router.get('/', userController.getUsers);

module.exports = router;
