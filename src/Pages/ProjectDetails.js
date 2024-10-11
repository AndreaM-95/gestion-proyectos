import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../Components/TaskList';
import axios from 'axios';

import '../Styles/main.css';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale('es', es);                                       // Registramos el idioma español


const ProjectDetails = () => {
  const { id } = useParams(); // Obtenemos el id del proyecto desde los parámetros de la URL
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());

  useEffect(() => {
    // Obtener proyecto del backend por ID
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(response => {
        const projectData = response.data;
        setProject(projectData);
        setFechaInicio(new Date(projectData.fecha_inicio));
        setFechaFin(new Date(projectData.fecha_finalizacion));
      })
      .catch(error => console.error('Error obteniendo el proyecto:', error));

    // Si necesitas las tareas también:
    // axios.get(`http://localhost:5000/api/tasks?project_id=${id}`)
    //   .then(response => setTasks(response.data))
    //   .catch(error => console.error('Error obteniendo las tareas:', error));
  }, [id]);

  return (
    <div id="pag-detalles" className="container">
      {project ? (
        <>
          <div key={project.id} className='d-flex flex-wrap justify-content-evenly align-items-center box-fecha p-3 border border-2 border-dark-subtle rounded my-2'>
            <h1 className='mt-5 mb-3'>{project.nombre}</h1>
            <p>{project.descripcion}</p>
            <div className=' p-3 border border-2 border-dark-subtle rounded m-2'>
              <p className='my-2 text-center'><strong>Fecha de inicio:</strong></p>
              <DatePicker
                selected={fechaInicio}
                onChange={date => setFechaInicio(date)}
                locale="es"
                dateFormat="dd 'de' MMM 'del' yyyy"
                className='mb-2 text-center border border-dark-subtle rounded py-2'
              />
            </div>
            <div className=' p-3 border border-2 border-dark-subtle rounded m-2'>
              <p className='my-2 text-center'><strong>Fecha de finalización:</strong></p>
              <DatePicker
                selected={fechaFin}
                onChange={date => setFechaFin(date)}
                locale="es"
                dateFormat="dd 'de' MMM 'del' yyyy"
                className='mb-2 text-center border border-dark-subtle rounded py-2'
              />
            </div>
          </div>
          <TaskList initialTasks={tasks} />
        </>
      ) : (
        <p>Cargando detalles del proyecto...</p>
      )}
    </div>
  );
};

export default ProjectDetails;
