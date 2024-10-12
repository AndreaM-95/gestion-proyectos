import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../Styles/main.css';
import Swal from 'sweetalert2'

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/projects/${id}`)                           // Obtener proyecto del backend por ID
      .then(response => {
        setProject(response.data);
      })
      .catch(error => console.error('Error obteniendo el proyecto:', error));
    listarTareas(id);                                                               // Obtener las tareas del proyecto desde el backend

    axios.get('http://localhost:5000/api/users')                                    // Obtener los usuarios
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

  // Guardar la tarea editada
  const handleSave = (taskId, updatedTask) => {
    axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask)
      .then(() => {
        listarTareas(id);                                                             // Actualizar la lista de tareas
        setIsEditing(null);                                                           // Salir del modo de edición
        Swal.fire({
          title:'<strong>Tarea actualizada</strong>',
          icon: 'success',
          confirmButtonColor: "#272323",
          timer: 3000
        });
      })
      .catch(error => {
        console.error('Error actualizando la tarea:', error.response ? error.response.data : error.message);
      });
  };

  // Eliminar la tarea
  const handleDelete = (taskId) => {
    Swal.fire({
      title: "Confirmar?",
      text: "Esta acción es irreversible!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#272323",
      cancelButtonColor: "#272323",
      confirmButtonText: "Si, eliminar."
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/tasks/${taskId}`)
          .then(() => {
            listarTareas(id);                                         // Actualizar la lista de tareas después de eliminar
          })
          .catch((error) => {
            console.error("Error eliminando la tarea: ", error);
            Swal.fire({
              title: '<strong>Oops..</strong>',
              html: '<i>Hubo un error al eliminar la tarea</i>',
              icon: 'error',
              confirmButtonColor: "#272323",
            });
          });
      }
    });
  };

  // Filtrar tareas
  const filteredTasks = tasks.filter(task =>
    task.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="pag-detalles" className="container min-vh-100">
      {project ? (
        <>
          <div key={project.id} className='d-flex flex-wrap justify-content-evenly align-items-center box-fecha p-3 border border-2 border-dark-subtle rounded mb-4 mt-5'>
            <h1>{project.nombre}</h1>
            <p>{project.descripcion}</p>
            <div className='p-3 border border-2 border-dark-subtle rounded'>
              <p className='my-1'><strong>Fecha de Inicio: </strong> {new Date(project.fecha_inicio).toLocaleDateString()}</p>
              <p className='my-1'><strong>Fecha de Finalización: </strong> {new Date(project.fecha_finalizacion).toLocaleDateString()}</p>
            </div>
          </div>

          <h3 className='mb-3 mt-5'>Tareas asociadas</h3>
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

          <div className='table-responsive mb-5'>
            <Table striped bordered hover table-responsive>
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
                          size='sm'
                          onClick={() => handleSave(task.id, { ...task })}>
                          Guardar
                        </Button>
                      ) : (
                        <div className='d-flex justify-content-center gap-2'>
                          <Button variant="warning" size='sm' onClick={() => setIsEditing(task.id)}>Editar</Button>
                          <Button variant="danger" size='sm' onClick={() => handleDelete(task.id)}>Eliminar</Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        <p>Cargando detalles del proyecto...</p>
      )}
    </div>
  );
};

export default ProjectDetails;


