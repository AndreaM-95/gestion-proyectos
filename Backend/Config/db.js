const mysql = require('mysql2');

// Configuración de la conexión con MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: "testDB",
    password: "0516",
    database: 'gestion-proyectos',
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;