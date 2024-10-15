import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);  // Esto te redirige a la ruta deseada
  };

  return (
    <nav className="navbar">
      <ul>
        <li><button onClick={() => handleNavigation('/formulario')}>Formulario de Solicitud</button></li>
        <li><button onClick={() => handleNavigation('/listado-solicitud')}>Listado de Solicitudes</button></li>
        <li><button onClick={() => handleNavigation('/busqueda-solicitud')}>Búsqueda de Solicitudes</button></li>
      </ul>
      <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>
    </nav>
  );
}

export default Navbar;
