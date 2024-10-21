import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
// import LoginForm from './components/LoginForm';
import HomePage from './pages/HomePage';
// import RequestForm from './components/RequestForm'; // Importar tu formulario
// import RequestList from './components/RequestList';
import FormularioList from './pages/FormularioList';
import FormularioForm from './pages/FormularioForm';
import BuscarFormulario from './pages/FormularioRequest';
// import EditRequest from './components/EditRequest';
import FormularioEdit from './pages/FormularioEdit';
import Login from './pages/Login';


function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route 
            path="/editar-solicitud/:id"
            element={
              isAuthenticated ? (
                <FormularioEdit setAuthenticated={setAuthenticated}/> // Mostrar el formulario solo si está autenticado
              ) : (
                <Navigate to="/" replace /> // Redirigir si no está autenticado
              )
            }
          />
          
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace /> // Redirigir si ya está autenticado
              ) : (
                <Login setAuthenticated={setAuthenticated} />
              )
            }
          />
          <Route 
            path="/home" 
            element={
              isAuthenticated ? (
                <HomePage setAuthenticated={setAuthenticated} />
              ) : (
                <Navigate to="/" replace /> // Redirigir si no está autenticado
              )
            }
          />
          <Route 
            path="/formulario" 
            element={
              isAuthenticated ? (
                <FormularioForm /> // Mostrar el formulario solo si está autenticado
              ) : (
                <Navigate to="/" replace /> // Redirigir si no está autenticado
              )
            }
          />
          <Route 
            path="/listado-solicitud" 
            element={
              isAuthenticated ? (
                <FormularioList /> // Mostrar el formulario solo si está autenticado
              ) : (
                <Navigate to="/" replace /> // Redirigir si no está autenticado
              )
            }
          />

          <Route 
            path="/busqueda-solicitud" 
            element={
              isAuthenticated ? (
                <BuscarFormulario /> // Mostrar el formulario solo si está autenticado
              ) : (
                <Navigate to="/" replace /> // Redirigir si no está autenticado
              )
            }
          />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;