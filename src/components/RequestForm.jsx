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
          // console.log('CSRF Cookie Set:', response);
        } catch (error) {
          console.error('Error al obtener CSRF cookie:', error);
        }
      };

    const EnviarDatos = async () => {
        await getCsrfToken();
        const csrfToken = Cookies.get('XSRF-TOKEN');
        const token = localStorage.getItem('authToken'); // Obtener el token del almacenamiento
        // console.log('datos desde React', formData);
            axios.post('http://localhost:8000/api/solicitudes', formData, {
                headers:{
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken, // Enviar el token CSRF
                    Authorization: `Bearer ${token}`, // Enviar el token en el header
                }
            })
        .then(response => {
            // console.log(response.data);
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
      <div className="input-nombre">
        <label htmlFor="nombre">Nombre Completo</label>
        <input type="text" id="nombre-input" name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} required />
      </div>
      <div className="input-rut">
        <label htmlFor="rut">RUT</label>
        <div className="rut-digito">
          <input type="text" id="rut-input" name="rut" value={formData.rut} onChange={handleChange} required />
          <p> - </p>
          <input type="text" id="diver-input" name="digito_verificador" value={formData.digito_verificador} onChange={handleChange} required />
        </div>
      </div>
      <div className="input-fecha">
        <label htmlFor="fecha_solicitud">Fecha de Solicitud</label>
        <input type="date" id="fecha-input" name="fecha_solicitud" value={formData.fecha_solicitud} onChange={handleChange} required />
      </div>
      <div className="input-sector">
        <label htmlFor="sector">Sector</label>
        <select id="sector-input" name="sector" value={formData.sector} onChange={handleChange}>
          <option value="" disabled hidden>-- SELECCIONE SECTOR --</option>
          <option value="Costa Norte">Costa Norte</option>
          <option value="Costa Sur">Costa Sur</option>
        </select>
      </div>
      <div className="input-motivo">
        <label htmlFor="motivo_solicitud">Motivo de la Solicitud</label>
        <textarea id="motivo-input" name="motivo_solicitud" value={formData.motivo_solicitud} onChange={handleChange} required></textarea>
      </div>
      <div className="input-contacto">
        <label htmlFor="contacto">Contacto</label>
        <input type="text" id="contacto-input" name="contacto" value={formData.contacto} onChange={handleChange} required />
      </div>
      <div className="input-estado">
        <label htmlFor="estado">Estado de Solicitud</label>
        <select id="estado-input" name="estado" value={formData.estado} onChange={handleChange}>
          <option value="" disabled hidden>-- SELECCIONE ESTADO --</option>
          <option value="Ingresado">Ingresado</option>
          <option value="Rechazado">Rechazado</option>
        </select>
      </div>
      <div className="input-localidad">
        <label htmlFor="localidad">Localidad</label>
        <input type="text" id="localidad-input" name="localidad" value={formData.localidad} onChange={handleChange} required />
      </div>
      <div className="button-container">
        <button type="submit" id="submit-button">Enviar Solicitud</button>
      </div>
    </form>

  );
}

export default RequestForm;
