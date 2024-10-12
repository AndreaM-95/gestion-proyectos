const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.get('/', userController.getUsers);       // Ruta para obtener todos los usuarios

module.exports = router;