import React, { useState, useEffect } from 'react';
import ProjectList from '../Components/ProjectList';
import '../Styles/main.css';


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
    <div id="pag-proyectos" className="container d-flex flex-column align-items-center col-12 col-md-6 justify-content-center">
      <h1 className='text-center fs-2 fs-md-1 bs-info my-5'>Proyectos</h1>
      <ProjectList projects={projects} />
    </div>
  );
}

export default Projects;