import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SearchRequest.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function SearchRequest() {
  const [requests, setRequests] = useState([]);
  const [searchID, setSearchID] = useState('');
  const [searchRUT, setSearchRUT] = useState('');
  const [searchSector, setSearchSector] = useState('');
  const navigate = useNavigate(); 
  
  useEffect(() => {
    // Cargar todas las solicitudes inicialmente
    axios.get('http://localhost:8000/api/solicitudes')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        alert('Error al cargar solicitudes.');
      });
  }, []);

  const token = localStorage.getItem('authToken'); // Obtener el token para las solicitudes

  const handleSearch = () => {
    const params = {
      id: searchID,
      rut: searchRUT,
      sector: searchSector
    };
    axios.get('http://localhost:8000/api/solicitudes', {
      params,
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token
      }
    })
    .then(response => {
      setRequests(response.data); // Mostrar resultados de la búsqueda
    })
    .catch(error => {
      alert('Error al buscar solicitudes.');
      console.error('Error:', error);
    });
  };

  const handleGeneratePDF = (id) => {
    const token = localStorage.getItem('authToken');
    axios.get(`http://localhost:8000/api/solicitudes/${id}/pdf`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `solicitud_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
    })
    .catch(error => {
      alert('Error al generar el PDF.');
      console.error('Error:', error);
    });
  };

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
    navigate(`/editar-solicitud/${id}`);
  };

  return (
    <div className="search-request">
      <h2>Buscar Solicitudes</h2>
      <div className="search-filters">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchID}
          onChange={(e) => setSearchID(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por RUT"
          value={searchRUT}
          onChange={(e) => setSearchRUT(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por Sector"
          value={searchSector}
          onChange={(e) => setSearchSector(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

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
              <td className='botonera'>
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

export default SearchRequest;
