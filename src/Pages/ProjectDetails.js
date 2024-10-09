import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importamos el hook useParams
import TaskList from '../Components/TaskList'; // Importamos TaskList para mostrar las tareas

const ProjectDetails = () => {
  const { id } = useParams(); // Obtenemos el id del proyecto desde los parámetros de la URL
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulación de carga de datos. En un futuro puedes usar una API real
    const mockProject = {
      id,
      nombre: "Proyecto A",
      descripcion: "Este es un proyecto de ejemplo",
      fecha_inicio: "2023-10-01",
      fecha_finalizacion: "2024-10-01",
    };

    const mockTasks = [
      { id: 1, nombre: "Tarea 1", estado: "pendiente" },
      { id: 2, nombre: "Tarea 2", estado: "en progreso" },
    ];

    setProject(mockProject);
    setTasks(mockTasks);
  }, [id]); // Dependemos del id que obtenemos de los parámetros

  return (
    <div className="container">
      {project ? (
        <>
          <h1>{project.nombre}</h1>
          <p>{project.descripcion}</p>
          <p><strong>Fecha de inicio:</strong> {project.fecha_inicio}</p>
          <p><strong>Fecha de finalización:</strong> {project.fecha_finalizacion}</p>
          <h3>Tareas asociadas</h3>
          <TaskList tasks={tasks} />
        </>
      ) : (
        <p>Cargando detalles del proyecto...</p>
      )}
    </div>
  );
}

export default ProjectDetails;
