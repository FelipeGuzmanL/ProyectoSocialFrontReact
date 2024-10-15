import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RequestList.css';

function RequestList() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/solicitudes')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        alert('Error al cargar solicitudes.');
      });
  }, []);

  const handleGeneratePDF = (id) => {
    axios.get(`http://localhost:8000/api/solicitudes/${id}/pdf`, { responseType: 'blob' })
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
            <th>Acciones</th> {/* Nueva columna de acciones */}
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
                {/* Botón para generar el PDF */}
                <button onClick={() => handleGeneratePDF(request.id)}>Generar PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RequestList;
