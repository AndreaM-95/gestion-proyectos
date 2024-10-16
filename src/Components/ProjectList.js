import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';          
import '../Styles/main.css';

/* Este posee la información básica de cada proyecto */
const ProjectList = ({ projectMap, handleEdit, handleDelete }) => {
  return (
    <div className="d-flex flex-wrap justify-content-evenly gap-2 mb-2">
      {projectMap.map((project) => (
        <Card key={project.id} style={{ width: '18rem' }} className="box-proyecto mb-3">
          <Card.Body>
            <Card.Title className='text-center'>{project.nombre}</Card.Title>
            <Card.Text className='text-center'>{project.descripcion}</Card.Text>
            <div className='d-flex justify-content-center'>
              <Link to={`/projects/${project.id}`}>
                <Button variant="primary" className='' size='sm'>Ver detalles</Button>
              </Link>
              <Button variant="warning" className="ms-2" size='sm' onClick={() => handleEdit(project.id)}>
                Editar
              </Button>
              <Button variant="danger" className="ms-2" size='sm' onClick={() => handleDelete(project.id)}>
                Eliminar
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default ProjectList;
