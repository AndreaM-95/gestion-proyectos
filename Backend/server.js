const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');  // Importamos las rutas de tareas
const userRoutes = require('./routes/users');  // Importamos la ruta de usuarios
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas para los proyectos y tareas
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
