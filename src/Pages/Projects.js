import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import ProjectList from '../Components/ProjectList';
import TaskCreate from '../Components/TaskCreate';
import Swal from 'sweetalert2';
import '../Styles/main.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [projectForm, setProjectForm] = useState({ nombre: '', descripcion: '', fecha_inicio: '', fecha_finalizacion: '', usuario_id: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Obtener la lista de proyectos y usuarios del backend
  useEffect(() => {
    listarProyectos();
    listarUsuarios();
  }, []);

  const listarProyectos = () => {
    axios.get("http://localhost:5000/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error obteniendo los proyectos:", error);
      });
  };

  const listarUsuarios = () => {
    axios.get("http://localhost:5000/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error obteniendo los usuarios:", error);
      });
  };

  // Manejar el formulario de creación/edición de proyectos
  const handleChange = (e) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios.put(`http://localhost:5000/api/projects/${editingProjectId}`, projectForm)    // Actualizar proyecto existente en el backend
        .then(response => {
          listarProyectos();
          setProjects(projects.map(project => project.id === editingProjectId ? response.data : project));
          setIsEditing(false);
          setEditingProjectId(null);
          setProjectForm({ nombre: '', descripcion: '', fecha_inicio: '', fecha_finalizacion: '', usuario_id: '' });
          Swal.fire({
            title: '<strong>Proyecto actualizado</strong>',
            icon: 'success',
            confirmButtonColor: "#272323",
            timer: 3000
          });
        })
        .catch(error => console.error('Error actualizando el proyecto:', error));
    } else {
      axios.post('http://localhost:5000/api/projects', projectForm)                         // Crear un nuevo proyecto en el backend
        .then(response => {
          listarProyectos();
          setProjects([...projects, response.data]);
          setProjectForm({ nombre: '', descripcion: '', fecha_inicio: '', fecha_finalizacion: '', usuario_id: '' });
          Swal.fire({
            title: '<strong>Registro exitoso</strong>',
            html: '<i>El proyecto ha sido creado</i>',
            icon: 'success',
            confirmButtonColor: "#272323",
            timer: 3000
          });
        })
        .catch(error => console.error('Error creando el proyecto:', error));
    }
  };

  // Editar un proyecto
  const handleEdit = (id) => {
    const projectToEdit = projects.find(project => project.id === id);
    setProjectForm(projectToEdit);
    setIsEditing(true);
    setEditingProjectId(id);
  };

  // Eliminar un proyecto del backend
  const handleDelete = (id) => {
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
        axios.get(`http://localhost:5000/api/tasks/project/${id}`)                // Primero, obtenemos las tareas asociadas al proyecto
          .then((response) => {
            const tasks = response.data;
            const deleteTasksPromises = tasks.map(task => {
              return axios.delete(`http://localhost:5000/api/tasks/${task.id}`);  // Eliminar cada tarea
            });
            return Promise.all(deleteTasksPromises);                              // Esperar a que todas las tareas se eliminen
          })
          .then(() => {
            return axios.delete(`http://localhost:5000/api/projects/${id}`);      // Una vez eliminadas las tareas, eliminamos el proyecto
          })
          .then(() => {
            setProjects(projects.filter(project => project.id !== id));           // Actualizar el estado para eliminar el proyecto de la lista
            Swal.fire({
              title: '<strong>Proyecto eliminado</strong>',
              icon: 'success',
              confirmButtonColor: "#272323",
            });
          })
          .catch((error) => {
            console.error("Hubo un error al eliminar el proyecto o las tareas: ", error);
            Swal.fire({
              title: '<strong>Oops..</strong>',
              html: '<i>Hubo un error al eliminar el proyecto o las tareas</i>',
              icon: 'error',
              confirmButtonColor: "#272323",
            });
          });
      }
    });
  };


  return (
    <div id="pag-proyectos" className="d-flex flex-column align-items-center col-12 col-md-6 justify-content-center">
      <h1 className='text-center fs-2 fs-md-1 bs-info my-5'>Proyectos</h1>
      <ProjectList projectMap={projects} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className='box-proyectos-tareas d-flex flex-wrap gap-2 mb-5'>
        <Form onSubmit={handleSubmit} className="box-crear p-4 border border-2 border-dark-subtle rounded">   {/* Crear un proyecto */}
          <h3 className='my-3'>{isEditing ? 'Editar proyecto' : 'Crear un nuevo proyecto'}</h3>
          <Form.Group controlId="validationName">
            <Form.Label>Nombre del Proyecto</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={projectForm.nombre}
              onChange={handleChange}
              placeholder="Digita aquí.."
              required
            />
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="descripcion"
              value={projectForm.descripcion}
              onChange={handleChange}
              placeholder="Digita aquí.."
              required
            />
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              name="fecha_inicio"
              value={projectForm.fecha_inicio}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Fecha de Finalización</Form.Label>
            <Form.Control
              type="date"
              name="fecha_finalizacion"
              value={projectForm.fecha_finalizacion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mt-3'>
            <Form.Label>Asignado a</Form.Label>
            <Form.Control
              as="select"
              name="usuario_id"
              value={projectForm.usuario_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un usuario</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.nombre}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            {isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto'}
          </Button>
        </Form>
        <TaskCreate />      {/* Crear una tarea */}
      </div>
    </div>
  );
};

export default Projects;