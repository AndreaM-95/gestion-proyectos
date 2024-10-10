import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importamos Link para manejar las rutas
import { CDBAnimation } from 'cdbreact';
import '../Styles/main.css';

/* Este posee la información básica de cada proyecto */
const ProjectList = ({ projects }) => {
  return (
    <div className="d-flex flex-wrap justify-content-evenly gap-5">
      {projects.map((project) => (
        <CDBAnimation type="headShake" key={project.id} >
          <Card style={{ width: '18rem' }} className="box-proyecto mb-3">
            <Card.Body>
              <Card.Title>{project.nombre}</Card.Title>
              <Card.Text>{project.descripcion}</Card.Text>
              <Link to={`/projects/${project.id}`}>
                <Button variant="primary">Ver detalles</Button>
              </Link>
            </Card.Body>
          </Card>
        </CDBAnimation>
      ))}
    </div>
  );
}

export default ProjectList;

