const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas para los proyectos
app.use('/api/projects', projectRoutes);

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
