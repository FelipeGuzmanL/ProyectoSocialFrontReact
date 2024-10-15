import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css';
import Cookies from 'js-cookie';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = `${username}@sanjuandelacosta.cl`;

    const datos = {
      email: email,
      password: password
    };

    console.log(datos);

    axios.defaults.withCredentials = true;

    const getCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
        console.log('CSRF Cookie Set:', response);
      } catch (error) {
        console.error('Error al obtener CSRF cookie:', error);
      }
    };

    const login = async () => {
      await getCsrfToken();

      const csrfToken = Cookies.get('XSRF-TOKEN');

      console.log(csrfToken);

      axios.post(`${process.env.REACT_APP_POST_LOGIN}`, datos, {
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': csrfToken, // Enviar el token CSRF
        }
      })
        .then(response => {
          console.log(response.data.token);
          onLoginSuccess(response.data.token);  // Guardar el token y pasar a la aplicación principal
        })
        .catch(error => {
          setError('Credenciales inválidas');
          console.log(error);
        });
    }

    login();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label htmlFor="username">Correo</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingrese el correo (sin @sanjuandelacosta.cl)"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginForm;