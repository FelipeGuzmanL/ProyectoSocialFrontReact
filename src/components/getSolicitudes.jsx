import React, { useEffect, useState } from 'react';
import { getSolicitudes } from './getData.jsx'; // Ajusta la ruta según tu proyecto

const SolicitudesComponents = () => {
  const [Solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const data = await getSolicitudes();
        setSolicitudes(data);
      } catch (err) {
        setError('No se pudieron obtener los países.');
      }
    };

    fetchSolicitudes();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Lista de Solicitudes</h1>
      <ul>
        {Solicitudes.map((solicitud) => (
          <li key={solicitud.id}>{solicitud.nombre_completo}</li>
        ))}
      </ul>
    </div>
  );
};

export default SolicitudesComponents;