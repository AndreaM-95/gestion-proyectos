const db = require('../Config/db');

// Obtener todos los proyectos
exports.getAllProjects = (req, res) => {
  const query = 'SELECT * FROM Proyectos';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Crear un nuevo proyecto
exports.createProject = (req, res) => {
  const { nombre, descripcion, fecha_inicio, fecha_finalizacion, usuario_id } = req.body;
  const query = 'INSERT INTO Proyectos (nombre, descripcion, fecha_inicio, fecha_finalizacion, usuario_id) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, fecha_inicio, fecha_finalizacion, usuario_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Proyecto creado exitosamente', id: result.insertId });
  });
};

// Obtener un proyecto por su ID
exports.getProjectById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Proyectos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }
    res.json(result[0]);
  });
};

// Actualizar un proyecto por su ID
exports.updateProject = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, fecha_inicio, fecha_finalizacion, usuario_id } = req.body;
    const query = 'UPDATE Proyectos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_finalizacion = ?, usuario_id = ? WHERE id = ?';
    db.query(query, [nombre, descripcion, fecha_inicio, fecha_finalizacion, usuario_id, id], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const queryGetProject = 'SELECT * FROM Proyectos WHERE id = ?';
      db.query(queryGetProject, [id], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.json(result[0]);
      });
    });
  };

// Eliminar un proyecto por su ID
exports.deleteProject = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Proyectos WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Proyecto eliminado exitosamente' });
  });
};
