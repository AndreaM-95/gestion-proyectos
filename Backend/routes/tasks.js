const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');

router.get('/project/:projectId', taskController.getTasksByProjectId);          // Obtener todas las tareas por ID de proyecto
router.post('/', taskController.createTask);                                    // Crear una nueva tarea
router.put('/:id', taskController.updateTask);                                  // Actualizar una tarea por ID
router.delete('/:id', taskController.deleteTask);                               // Eliminar una tarea por ID

module.exports = router;
