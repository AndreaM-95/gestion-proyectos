import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskList from '../Components/TaskList';
import { CDBAnimation } from 'cdbreact';
import '../Styles/main.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
registerLocale('es', es);                                       // Registramos el idioma español

const ProjectDetails = () => {
  const { id } = useParams();                                   // Obtenemos el id del proyecto desde los parámetros de la URL
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(new Date()); 
  const [fechaFin, setFechaFin] = useState(new Date());

  useEffect(() => {
    // Simulación de carga de datos.
    const mockProject = {
      id,
      nombre: 'Proyecto A',
      descripcion: 'Este es un proyecto de ejemplo',
      fecha_inicio: '2023-10-01',
      fecha_finalizacion: '2024-10-01',
    };

    const mockTasks = [
      { id: 1, nombre: 'Tarea 1', estado: 'pendiente' },
      { id: 2, nombre: 'Tarea 2', estado: 'en progreso' },
    ];

    // Establecemos el proyecto y las tareas
    setProject(mockProject);
    setTasks(mockTasks);

    // Convertimos la fecha_inicio del mockProject en un objeto Date para el DatePicker
    setFechaInicio(new Date(mockProject.fecha_inicio));
    setFechaFin(new Date(mockProject.fecha_finalizacion));
  }, [id]);                                               // Dependemos del id que obtenemos de los parámetros

  return (
    <div id="pag-detalles" className="container">
      {project ? (
        <>
          <CDBAnimation type="bounce" key={project.id} >
          <h1 className='mt-5 mb-3'>{project.nombre}</h1>
          <p>{project.descripcion}</p>

          <div className='d-flex flex-wrap justify-content-evenly align-items-center'>
            <div className='box-fecha p-3 border border-2 border-dark-subtle rounded m-2'>
              <p className='my-2 text-center'><strong>Fecha de inicio:</strong></p>
              <DatePicker
                selected={fechaInicio}
                onChange={date => setFechaInicio(date)}       // Cambiamos el estado de la fecha cuando seleccionamos una nueva
                locale="es"                                   // Usamos el idioma español
                dateFormat="dd 'de' MMM 'del' yyyy"           // Formato de fecha
                className='mb-2 text-center border border-dark-subtle rounded py-2'
              />
            </div>

            <div className='box-fecha p-3 border border-2 border-dark-subtle rounded m-2'>
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
          
          <h3 className='my-3'>Tareas asociadas</h3>

          <TaskList tasks={tasks} />
          </CDBAnimation>
        </>
      ) : (
        <p>Cargando detalles del proyecto...</p>
      )}
    </div>
  );
};

export default ProjectDetails;