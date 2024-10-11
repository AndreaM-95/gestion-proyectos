import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import ProjectList from '../Components/ProjectList';
import '../Styles/main.css';
import axios from 'axios'; // Usamos axios para las peticiones al backend

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({ nombre: '', descripcion: '', fecha_inicio: '', fecha_finalizacion: '', usuario_id: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // Obtener la lista de proyectos del backend
  useEffect(() => {
    listarProyectos();
  }, []);

  const listarProyectos = () => {
    axios.get("http://localhost:5000/api/projects")
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => {
        console.error("Error obteniendo los proyectos:", error);
      });
  }

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
      // Actualizar proyecto existente en el backend
      axios.put(`http://localhost:5000/api/projects/${editingProjectId}`, projectForm)
        .then(response => {
          listarProyectos();
          setProjects(projects.map(project => project.id === editingProjectId ? response.data : project));
          setIsEditing(false);
          setEditingProjectId(null);
          setProjectForm({ nombre: '', descripcion: '', fecha_inicio: '', fecha_finalizacion: '', usuario_id: '' });
        })
        .catch(error => console.error('Error actualizando el proyecto:', error));
    } else {
      // Crear un nuevo proyecto en el backend
      axios.post('http://localhost:5000/api/projects', projectForm)
        .then(response => {
          listarProyectos();
          setProjects([...projects, response.data]);
          setProjectForm({ nombre: '', descripcion: '', fecha_inicio: '', fecha_finalizacion: '', usuario_id: '' });
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
    axios.delete(`http://localhost:5000/api/projects/${id}`)
      .then(() => setProjects(projects.filter(project => project.id !== id)))
      .catch(error => console.error('Error eliminando el proyecto:', error));
  };

  return (
    <div id="pag-proyectos" className="container d-flex flex-column align-items-center col-12 col-md-6 justify-content-center">
      <h1 className='text-center fs-2 fs-md-1 bs-info my-5'>Proyectos</h1>
      <ProjectList projectMap={projects}  handleEdit={handleEdit} handleDelete={handleDelete} />

      {/* Formulario para crear/editar proyecto */}
      <Form onSubmit={handleSubmit} className="w-100 mb-5 p-4 border border-2 border-dark-subtle rounded">
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
        <Form.Group>
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
        <Form.Group>
          <Form.Label>Fecha de Inicio</Form.Label>
          <Form.Control
            type="date"
            name="fecha_inicio"
            value={projectForm.fecha_inicio}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Fecha de Finalización</Form.Label>
          <Form.Control
            type="date"
            name="fecha_finalizacion"
            value={projectForm.fecha_finalizacion}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>ID del Usuario</Form.Label>
          <Form.Control
            type="number"
            name="usuario_id"
            value={projectForm.usuario_id}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {isEditing ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        </Button>
      </Form>
    </div>
  );
}

export default Projects;
