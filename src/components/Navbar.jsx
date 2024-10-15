import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Asegúrate que la ruta sea correcta

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Redirige a la ruta deseada
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <ul className="navbar-links">
          <li>
            <button onClick={() => handleNavigation('/formulario')}>
              Formulario de Solicitud
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/listado-solicitud')}>
              Listado de Solicitudes
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/busqueda-solicitud')}>
              Búsqueda de Solicitudes
            </button>
          </li>
        </ul>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
}

export default Navbar;