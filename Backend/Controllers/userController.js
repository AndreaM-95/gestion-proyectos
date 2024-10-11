const db = require('../Config/db');

// Obtener todos los usuarios
exports.getUsers = (req, res) => {
  const query = 'SELECT * FROM Usuarios';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
