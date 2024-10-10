import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import '../Styles/main.css';

const Home = () => {
  return (
    <section className='home d-flex flex-wrap justify-content-center align-items-center'>
      <div id='fondo'></div>
      <div className='d-flex flex-column align-items-center col-12 col-md-6'>
        <h1 className='text-center fs-2 fs-md-1 bs-info my-2'>Gestiona tus proyectos, ¡Bienvenido!</h1>
        <Link to={`/Projects`}>
          <Button variant="info" className='btns w-md-50 my-2 py-2' size="sm">Ver proyectos</Button>
        </Link>
      </div>
    </section>
  );
}

export default Home;