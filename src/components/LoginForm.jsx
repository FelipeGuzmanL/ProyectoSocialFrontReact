import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginForm.css';

function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/login', {
      email: `${email}@sanjuandelacosta.cl`,
      password: password
    })
      .then(response => {
        console.log(email);
        onLoginSuccess(response.data.token);  // Guardar el token y pasar a la aplicación principal
      })
      .catch(error => {
        setError('Credenciales inválidas');
        console.log(email);
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label htmlFor="email">Correo</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
