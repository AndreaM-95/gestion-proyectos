import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const TaskList = ({ tasks }) => {
  return (
    <ListGroup>
      {tasks.map(task => (
        <ListGroup.Item key={task.id} className="d-flex justify-content-between align-items-center">
            {task.nombre}
            <DropdownButton id="dropdown-basic-button" title="Estado">
                <Dropdown.Item href="#/action-1">Pendiente</Dropdown.Item>
                <Dropdown.Item href="#/action-2">En progreso</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Completada</Dropdown.Item>
            </DropdownButton>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default TaskList;
