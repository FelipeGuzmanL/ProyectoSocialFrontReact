import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RequestForm.css';

function RequestForm({ onRequestAdded }) {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    rut: '',
    digito_verificador: '',
    fecha_solicitud: '',
    sector: '',
    motivo_solicitud: '',
    contacto: '',
    estado_solicitud: '',
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
    axios.post('http://localhost:8000/api/solicitudes', formData)
      .then(response => {
        alert('Solicitud ingresada con éxito');
        onRequestAdded();  // Notificar que la solicitud fue agregada
      })
      .catch(error => {
        alert('Error al ingresar la solicitud.');
      });
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
        <select name="estado_solicitud" value={formData.estado_solicitud} onChange={handleChange}>
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
