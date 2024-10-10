import React, { useState } from 'react';
import { DropdownButton, Dropdown, Button, Form, Table } from 'react-bootstrap';
import '../Styles/main.css';

const TaskList = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);               // Inicializamos con las tareas recibidas por props
  const [newTaskName, setNewTaskName] = useState('');             // Para el nombre de la nueva tarea
  const [newTaskDescription, setNewTaskDescription] = useState(''); // Para la descripción de la nueva tarea
  const [editingTaskId, setEditingTaskId] = useState(null);       // Almacena el ID de la tarea que está en modo edición
  const [editedTaskName, setEditedTaskName] = useState('');       // Para el nombre de la tarea editada
  const [editedTaskDescription, setEditedTaskDescription] = useState(''); // Para la descripción de la tarea editada
  const [searchTerm, setSearchTerm] = useState('');               // Para el término de búsqueda

  // Añadir nueva tarea
  const addTask = () => {
    if (newTaskName.trim() === '' || newTaskDescription.trim() === '') return;  // Validación básica
    const newTask = {
      id: tasks.length + 1,                                       // Generamos un ID único para la tarea
      nombre: newTaskName,
      descripcion: newTaskDescription,
    };
    setTasks([...tasks, newTask]);                                // Añadimos la nueva tarea a la lista
    setNewTaskName('');                                           // Limpiamos el input del nombre
    setNewTaskDescription('');                                    // Limpiamos el input de la descripción
  };

  // Editar tarea
  const editTask = (id) => {
    const updatedTasks = tasks.map(task => 
      task.id === id ? { ...task, nombre: editedTaskName, descripcion: editedTaskDescription } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);                                       // Salimos del modo edición
    setEditedTaskName('');                                        // Limpiamos el input del nombre de edición
    setEditedTaskDescription('');                                 // Limpiamos el input de la descripción de edición
  };

  // Eliminar tarea
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Filtrar tareas según el término de búsqueda en nombre o descripción
  const filteredTasks = tasks.filter(task => 
    task.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Formulario para añadir una nueva tarea */}
      <Form className="form my-3 p-4 border border-2 border-dark-subtle rounded d-flex flex-column justify-content-evenly">
        <h3 className='mt-2 mb-4'>Crear nueva tarea</h3>
        <Form.Group id="form-group">
          <label>Nombre de la tarea:
            <Form.Control
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Digita aquí.."
              className='mt-2'
            />
          </label>

          <label>Descripción de la tarea:
            <Form.Control
              type="text"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Digita aquí.."
              className='mt-2'
            /> 
          </label>
        </Form.Group>
        <div className='p-2'>
          <Button variant="info" className='w-md-50 py-2' size="sm" onClick={addTask}>
            Añadir Tarea
          </Button>
        </div>
      </Form>

      <div className='my-3 p-4 border border-2 border-dark-subtle rounded'>
        {/* Barra de búsqueda */}
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

        {/* Lista de tareas */}
        <div className="table-responsive"> {/* Este contenedor hace la tabla responsive */}
          <Table striped bordered hover className='border border'> 
            <thead>
              <tr>
                <th className='titulo-tabla'>ID</th>
                <th className='titulo-tabla'>Nombre</th>
                <th className='titulo-tabla'>Descripción</th>
                <th className='titulo-tabla'>Estado</th>
                <th className='titulo-tabla'>Proyecto</th>
                <th className='titulo-tabla'>Encargado</th>
                <th className='titulo-tabla'>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>                                      
                  <td>{task.nombre}</td>                                   
                  <td>{task.descripcion}</td>                               
                  <td>
                    <DropdownButton id="dropdown-basic-button" title="Pendiente">
                      <Dropdown.Item className='btn-warning'>En progreso</Dropdown.Item>
                      <Dropdown.Item className='btn-success'>Completada</Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td>
                    <DropdownButton id="dropdown-basic-button" title="Proyecto">
                      <Dropdown.Item className='btn-warning'>Proyecto 1</Dropdown.Item>
                      <Dropdown.Item className='btn-success'>Proyecto 2</Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td>
                    <DropdownButton id="dropdown-basic-button" title="Responsable">
                      <Dropdown.Item href="#/action-1">Andrea Mejia</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Natalia Ramirez</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Jhon Zambrano</Dropdown.Item>
                    </DropdownButton>
                  </td>

                  {/* Edición de la tarea */}
                  {editingTaskId === task.id ? (                       
                    <td className="d-flex flex-grow-1 gap-2">
                      <Form.Control
                        type="text"
                        value={editedTaskName}
                        onChange={(e) => setEditedTaskName(e.target.value)}
                        placeholder="Editar nombre"
                      />
                      <Form.Control
                        type="text"
                        value={editedTaskDescription}
                        onChange={(e) => setEditedTaskDescription(e.target.value)}
                        placeholder="Editar descripción"
                      />
                      <Button onClick={() => editTask(task.id)} className="btn btn-success ms-2">
                        Guardar
                      </Button>
                    </td>
                  ) : (
                    <td className='d-flex flex-grow-1 gap-2'>
                      <Button variant="warning" onClick={() => {
                        setEditingTaskId(task.id);
                        setEditedTaskName(task.nombre); // Llenamos el input con el nombre de la tarea actual
                        setEditedTaskDescription(task.descripcion); // Llenamos el input con la descripción actual
                      }}>
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => deleteTask(task.id)}>
                        Eliminar
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
