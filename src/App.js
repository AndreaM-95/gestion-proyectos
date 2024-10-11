import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Components/Navbar';
import Home from './Pages/Home';
import Projects from './Pages/Projects';
import Footer from './Components/Footer';
import './App.css';
import ProjectDetails from './Pages/ProjectDetails';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;