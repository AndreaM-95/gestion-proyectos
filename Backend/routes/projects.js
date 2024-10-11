const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectController');

router.get('/', projectController.getAllProjects);          // Ruta para listar todos los proyectos
router.post('/', projectController.createProject);          // Ruta para crear un nuevo proyecto
router.get('/:id', projectController.getProjectById);       // Ruta para obtener un proyecto por ID
router.put('/:id', projectController.updateProject);        // Ruta para actualizar un proyecto por ID
router.delete('/:id', projectController.deleteProject);     // Ruta para eliminar un proyecto por ID

module.exports = router;