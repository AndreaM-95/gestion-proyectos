import React, { useState, useEffect } from 'react';
import ProjectList from '../Components/ProjectList';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Aquí se hace la llamada a la API o se carga información mock
    const mockProjects = [
      { id: 1, nombre: "Proyecto A", descripcion: "Descripción del Proyecto A" },
      { id: 2, nombre: "Proyecto B", descripcion: "Descripción del Proyecto B" },
    ];
    setProjects(mockProjects);
  }, []);

  return (
    <div className="container">
      <h1>Proyectos</h1>
      <ProjectList projects={projects} />
    </div>
  );
}

export default Projects;