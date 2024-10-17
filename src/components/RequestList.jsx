import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RequestList.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function RequestList() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:8000/api/solicitudes')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        alert('Error al cargar solicitudes.');
      });
  }, []);

  const handleDeleteRequest = (id) => {
    const csrfToken = Cookies.get('XSRF-TOKEN');
    const token = localStorage.getItem('authToken');
    
    axios.delete(`http://localhost:8000/api/solicitudes/${id}`, {
      headers: {
        'X-XSRF-TOKEN': csrfToken,
        Authorization: `Bearer ${token}`,
        
      }
    })
    .then(response => {
      alert('Solicitud eliminada correctamente');
      setRequests(requests.filter(request => request.id !== id)); // Actualizar la lista
    })
    .catch(error => {
      alert('Error al eliminar la solicitud.');
      console.error('Error:', error);
    });
  };

  const handleEditRequest = (id) => {
    // Redirigir a la página de edición (ejemplo)
    navigate(`/editar-solicitud/${id}`)
    // window.location.href = `/editar-solicitud/${id}`;
  };

  const handleGeneratePDF = (id) => {
    const token = localStorage.getItem('authToken'); // Obtener el token
    axios.get(`http://localhost:8000/api/solicitudes/${id}/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token en el header
      },
      responseType: 'blob', // Recibir el PDF como blob
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `solicitud_${id}.pdf`); // Descargar el PDF
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        alert('Error al generar el PDF.');
        console.error('Error:', error);
      });
  };
  
  return (
    <div className="request-list">
      <h2>Listado de Solicitudes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>RUT</th>
            <th>Fecha de Solicitud</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.nombre_completo}</td>
              <td>{request.rut}</td>
              <td>{request.fecha_solicitud}</td>
              <td>{request.estado_solicitud}</td>
              <td>
                <button onClick={() => handleGeneratePDF(request.id)}>Generar PDF</button>
                <button onClick={() => handleEditRequest(request.id)}>Editar</button>
                <button onClick={() => handleDeleteRequest(request.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;
