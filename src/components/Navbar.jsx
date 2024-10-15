import React from 'react';
import '../styles/Navbar.css';

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <ul>
        <li><a href="/formulario-solicitud">Formulario de Solicitud</a></li>
        <li><a href="/listado-solicitud">Listado de Solicitudes</a></li>
        <li><a href="/busqueda-solicitud">Búsqueda de Solicitudes</a></li>
      </ul>
      <button className="logout-button" onClick={onLogout}>Cerrar Sesión</button>
    </nav>
  );
}

export default Navbar;
