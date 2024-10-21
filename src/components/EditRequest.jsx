import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'; // Para obtener el token CSRF
import '../styles/EditForm.css';
import { useParams, useNavigate } from 'react-router-dom'; // Para obtener el ID de la solicitud desde la URL y redirigir

function EditRequest() {
  const { id } = useParams(); // Obtener el ID de la solicitud de la URL
  const navigate = useNavigate(); // Para redirigir después de la actualización
  const [requestData, setRequestData] = useState({
    nombre_completo: '',
    rut: '',
    fecha_solicitud: '',
    estado_solicitud: '',
    sector: '',
    motivo_solicitud: '',
    localidad: '',
    contacto: '',
    // Otros campos que se necesite
  });
  
  const csrfToken = Cookies.get('XSRF-TOKEN');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`http://localhost:8000/api/solicitudes/${id}`, {
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      // console.log(response);
      setRequestData(response.data); // Pre-rellenar los campos con la data obtenida
    })
    .catch(error => {
      console.error('Error al cargar la solicitud:', error);
      alert('Error al cargar la solicitud.');
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData({
      ...requestData,
      [name]: value, // Actualizar el valor del campo
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hacer la solicitud PUT para actualizar la solicitud
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const token = localStorage.getItem('authToken');
    axios.put(`http://localhost:8000/api/solicitudes/${id}`, requestData, {
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      alert('Solicitud actualizada correctamente.');
      navigate('/listado-solicitud'); // Redirigir al listado de solicitudes
    })
    .catch(error => {
      console.error('Error al actualizar la solicitud:', error);
      alert('Error al actualizar la solicitud.');
    });
  };

  return (
    <div>
      <h2>Editar Solicitud</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre Completo:
          <input
            type="text"
            name="nombre_completo"
            value={requestData.nombre_completo}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          RUT:
          <input
            type="text"
            name="rut"
            value={requestData.rut}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Fecha de Solicitud:
          <input
            type="date"
            name="fecha_solicitud"
            value={requestData.fecha_solicitud}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Estado de Solicitud:
          <select
            name="estado_solicitud"
            value={requestData.estado_solicitud}
            onChange={handleInputChange}
            required
          >
            <option value="Ingresado">Ingresado</option>
            <option value="Rechazado">Rechazado</option>
            <option value="Aprobado">Aprobado</option>
          </select>
        </label>
        <br />
        <label>
          Sector:
          <select
            name="sector"
            value={requestData.sector}
            onChange={handleInputChange}
            required
          >
            <option value="Costa Norte">Costa Norte</option>
            <option value="Costa Sur">Costa Sur</option>
          </select>
        </label>
        <br />
        <label>
          Motivo de la Solicitud:
          <textarea
            name="motivo_solicitud"
            value={requestData.motivo_solicitud}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Localidad:
          <textarea
            name="localidad"
            value={requestData.localidad}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        <label>
          Contacto:
          <textarea
            name="contacto"
            value={requestData.contacto}
            onChange={handleInputChange}
            required
          />
        </label>
        <br />
        {/* Agregar más campos aquí si es necesario */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditRequest;
