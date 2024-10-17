import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RequestForm.css';
import Cookies from 'js-cookie';

function RequestForm({ onRequestAdded }) {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    rut: '',
    digito_verificador: '',
    fecha_solicitud: '',
    sector: '',
    motivo_solicitud: '',
    contacto: '',
    estado: '',
    localidad: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();

    const getCsrfToken = async () => {
        try {
          const response = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
          console.log('CSRF Cookie Set:', response);
        } catch (error) {
          console.error('Error al obtener CSRF cookie:', error);
        }
      };

    const EnviarDatos = async () => {
        await getCsrfToken();
        const csrfToken = Cookies.get('XSRF-TOKEN');
        const token = localStorage.getItem('authToken'); // Obtener el token del almacenamiento
        console.log('datos desde React', formData);
            axios.post('http://localhost:8000/api/solicitudes', formData, {
                headers:{
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken, // Enviar el token CSRF
                    Authorization: `Bearer ${token}`, // Enviar el token en el header
                }
            })
        .then(response => {
            console.log(response.data);
            alert('Solicitud ingresada con éxito');
            //onRequestAdded();  // Notificar que la solicitud fue agregada
        })
        .catch(error => {
            alert('Error al ingresar la solicitud.');
        });
    };
    EnviarDatos();
  };

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <h2>Formulario de Solicitud</h2>
      <div className="input-group">
        <label>Nombre Completo</label>
        <input type="text" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>RUT</label>
        <input type="text" name="rut" value={formData.rut} onChange={handleChange} required />
        <input type="text" name="digito_verificador" value={formData.digito_verificador} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Fecha de Solicitud</label>
        <input type="date" name="fecha_solicitud" value={formData.fecha_solicitud} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Sector</label>
        <select name="sector" value={formData.sector} onChange={handleChange}>
          <option value="" disabled hidden>-- SELECCIONE SECTOR --</option>
          <option value="Costa Norte">Costa Norte</option>
          <option value="Costa Sur">Costa Sur</option>
        </select>
      </div>
      <div className="input-group">
        <label>Motivo de la Solicitud</label>
        <textarea name="motivo_solicitud" value={formData.motivo_solicitud} onChange={handleChange} required></textarea>
      </div>
      <div className="input-group">
        <label>Contacto</label>
        <input type="text" name="contacto" value={formData.contacto} onChange={handleChange} required />
      </div>
      <div className="input-group">
        <label>Estado de Solicitud</label>
        <select name="estado" value={formData.estado} onChange={handleChange}>
          <option value="" disabled hidden>-- SELECCIONE ESTADO --</option>
          <option value="Ingresado">Ingresado</option>
          <option value="Rechazado">Rechazado</option>
        </select>
      </div>
      <div className="input-group">
        <label>Localidad</label>
        <input type="text" name="localidad" value={formData.localidad} onChange={handleChange} required />
      </div>
      <button type="submit">Enviar Solicitud</button>
    </form>
  );
}

export default RequestForm;
