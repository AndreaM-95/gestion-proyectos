import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Styles/main.css';


const TaskList = ({ tasks }) => {
  return (
    <ListGroup className='box-fecha mb-5'>
      {tasks.map(task => (
        <ListGroup.Item key={task.id} className="d-flex flex-wrap justify-content-between align-items-center border border-dark-subtle">
            <p className='my-2'>{task.nombre}</p>
            <div className='d-flex gap-3'>
              <DropdownButton id="dropdown-basic-button" title="Responsable">           {/*Usuarios registrados para las tareas*/}
                  <Dropdown.Item href="#/action-1">Andrea Mejia</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Natalia Ramirez</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Jhon Zambrano</Dropdown.Item>
              </DropdownButton>
              <DropdownButton id="dropdown-basic-button" title="Pendiente">             {/*Estado de cada tarea*/}
                  <Dropdown.Item href="#/action-2" className='btn-warning'>En progreso</Dropdown.Item>
                  <Dropdown.Item href="#/action-3" className='btn-success'>Completada</Dropdown.Item>
              </DropdownButton>
            </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TaskList;
