import React from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // Asegúrate que la ruta sea correcta
import axios from 'axios';
import Cookies from 'js-cookie';

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem('authToken'); // Obtiene el token de localStorage
    const csrfToken = Cookies.get('XSRF-TOKEN');

    axios.defaults.withCredentials = true;
    axios.post('http://localhost:8000/api/logout', {}, {
      headers: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': csrfToken, // Enviar el token CSRF
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // Elimina el token del localStorage
      localStorage.removeItem('authToken');
      
      // Llama al callback onLogout para actualizar el estado de autenticación
      onLogout();
      
      // Redirige al usuario a la página de inicio de sesión
      navigate('/home');
    })
    .catch(error => {
      console.error('Error al cerrar sesión:', error);
      // Puedes agregar lógica para manejar el error aquí
    });
  };

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
      <button className="logout-button" onClick={handleLogout}>
        Cerrar Sesión
      </button>
    </nav>
  );
}

export default Navbar;