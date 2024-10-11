import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TaskCreate = () => {
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [proyectos, setProyectos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedEncargado, setSelectedEncargado] = useState('');
  const [selectedEstado, setSelectedEstado] = useState('pendiente');

  useEffect(() => {
    // Obtener los proyectos
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProyectos(response.data))
      .catch(error => console.error('Error obteniendo los proyectos:', error));

    // Obtener los usuarios
    axios.get('http://localhost:5000/api/users')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Error obteniendo los usuarios:', error));
  }, []);

  const addTask = () => {
    if (!newTaskName || !newTaskDescription || !selectedProject || !selectedEncargado) return;

    const newTask = {
      nombre: newTaskName,
      descripcion: newTaskDescription,
      estado: selectedEstado,
      proyecto_id: selectedProject,
      asignada_a: selectedEncargado
    };

    axios.post('http://localhost:5000/api/tasks', newTask)
      .then(() => {
        setNewTaskName('');
        setNewTaskDescription('');
        setSelectedProject('');
        setSelectedEncargado('');
        setSelectedEstado('pendiente');
      })
      .catch(error => console.error('Error creando la tarea:', error));
  };

  return (
    <div className='form my-3 p-4 border border-2 border-dark-subtle rounded'>
      <h3 className='mt-2 mb-4'>Crear nueva tarea</h3>

      <Form.Group>
        <Form.Label>Nombre de la tarea</Form.Label>
        <Form.Control
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Digita aquí.."
        />
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Digita aquí.."
        />
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Label>Estado</Form.Label>
        <Form.Control as="select" value={selectedEstado} onChange={(e) => setSelectedEstado(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Label>Proyecto</Form.Label>
        <Form.Control as="select" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
          <option value="">Selecciona un proyecto...</option>
          {proyectos.map(proyecto => (
            <option key={proyecto.id} value={proyecto.id}>
              {proyecto.nombre}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Label>Asignado a</Form.Label>
        <Form.Control as="select" value={selectedEncargado} onChange={(e) => setSelectedEncargado(e.target.value)}>
          <option value="">Selecciona un encargado...</option>
          {usuarios.map(usuario => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" className="mt-4" onClick={addTask}>
        Añadir Tarea
      </Button>
    </div>
  );
};

export default TaskCreate;
