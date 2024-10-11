import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/main.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // Controla qué tarea se está editando

  useEffect(() => {
    // Obtener proyecto del backend por ID
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(response => {
        setProject(response.data);
      })
      .catch(error => console.error('Error obteniendo el proyecto:', error));

    // Obtener las tareas del proyecto desde el backend
    listarTareas(id);

    // Obtener los usuarios
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Error obteniendo los usuarios:', error));
  }, [id]);

  const listarTareas = (projectId) => {
    axios.get(`http://localhost:5000/api/tasks/project/${projectId}`)
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => console.error('Error obteniendo las tareas:', error));
  };

  // Manejador para guardar la tarea editada
  const handleSave = (taskId, updatedTask) => {
    axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask)
      .then(() => {
        listarTareas(id); // Actualizar la lista de tareas
        setIsEditing(null); // Salir del modo de edición
      })
      .catch(error => {
        console.error('Error actualizando la tarea:', error.response ? error.response.data : error.message);
      });
  };

  // Manejador para eliminar la tarea
  const handleDelete = (taskId) => {
    axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
      .then(() => {
        listarTareas(id); // Actualizar la lista de tareas después de eliminar
      })
      .catch(error => {
        console.error('Error eliminando la tarea:', error.response ? error.response.data : error.message);
      });
  };

  // Filtrar tareas
  const filteredTasks = tasks.filter(task =>
    task.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="pag-detalles" className="container">
      {project ? (
        <>
          <div key={project.id} className='d-flex flex-wrap justify-content-evenly align-items-center box-fecha p-3 border border-2 border-dark-subtle rounded my-2'>
            <h1 className='mt-5 mb-3'>{project.nombre}</h1>
            <p>Fecha de Inicio: {new Date(project.fecha_inicio).toLocaleDateString()}</p>
            <p>Fecha de Finalización: {new Date(project.fecha_finalizacion).toLocaleDateString()}</p>
          </div>


          <h3 className='my-3'>Tareas asociadas</h3>
          <Form className="my-3">
            <Form.Group>
              <Form.Control
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar tarea por nombre o descripción..."
              />
            </Form.Group>
          </Form>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Asignado a</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>
                    {isEditing === task.id ? (
                      <input 
                        type="text" 
                        defaultValue={task.nombre} 
                        onChange={(e) => task.nombre = e.target.value} 
                      />
                    ) : (
                      <p>{task.nombre}</p>
                    )}
                  </td>
                  <td>
                    {isEditing === task.id ? (
                      <input 
                        type="text" 
                        defaultValue={task.descripcion} 
                        onChange={(e) => task.descripcion = e.target.value} 
                      />
                    ) : (
                      <p>{task.descripcion}</p>
                    )}
                  </td>
                  <td>
                    {isEditing === task.id ? (
                      <Form.Control as="select" 
                        defaultValue={task.estado} 
                        onChange={(e) => task.estado = e.target.value}>
                        <option value="pendiente">Pendiente</option>
                        <option value="en progreso">En progreso</option>
                        <option value="completada">Completada</option>
                      </Form.Control>
                    ) : (
                      <p>{task.estado}</p>
                    )}
                  </td>

                  <td>
                    {isEditing === task.id ? (
                      <Form.Control as="select" 
                        defaultValue={task.asignada_a} 
                        onChange={(e) => task.asignada_a = e.target.value}>
                        {usuarios.map(usuario => (
                          <option key={usuario.id} value={usuario.id}>
                            {usuario.nombre}
                          </option>
                        ))}
                      </Form.Control>
                    ) : (
                      <p>
                        {usuarios.find(usuario => usuario.id === task.asignada_a)?.nombre || 'No asignado'}
                      </p>
                    )}
                  </td>

                  <td>
                    {isEditing === task.id ? (
                      <Button 
                        variant="success" 
                        onClick={() => handleSave(task.id, { ...task })}>
                        Guardar
                      </Button>
                    ) : (
                      <>
                        <Button variant="warning" onClick={() => setIsEditing(task.id)}>Editar</Button>
                        <Button variant="danger" onClick={() => handleDelete(task.id)}>Eliminar</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p>Cargando detalles del proyecto...</p>
      )}
    </div>
  );
};

export default ProjectDetails;


