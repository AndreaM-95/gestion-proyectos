const db = require('../Config/db');

// Obtener todas las tareas por ID de proyecto
exports.getTasksByProjectId = (req, res) => {
  const { projectId } = req.params;
  const query = 'SELECT * FROM Tareas WHERE proyecto_id = ?';
  
  db.query(query, [projectId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);  // Envía las tareas como respuesta
  });
};

// Crear una nueva tarea
exports.createTask = (req, res) => {
  const { nombre, descripcion, estado, proyecto_id, asignada_a } = req.body;
  if (!nombre || !descripcion || !proyecto_id) {
    return res.status(400).json({ message: 'Nombre, Descripción y Proyecto son obligatorios' });
  }

  const query = 'INSERT INTO Tareas (nombre, descripcion, estado, proyecto_id, asignada_a) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, estado || 'pendiente', proyecto_id, asignada_a], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Tarea creada exitosamente', id: result.insertId });
  });
};

// Actualizar una tarea
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado, asignada_a } = req.body; // Todos los campos que deseas actualizar

  const query = 'UPDATE Tareas SET nombre = ?, descripcion = ?, estado = ?, asignada_a = ? WHERE id = ?';
  db.query(query, [nombre, descripcion, estado, asignada_a, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Tarea actualizada exitosamente' });
  });
};


// Eliminar una tarea
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM Tareas WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Tarea eliminada exitosamente' });
  });
};
