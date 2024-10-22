import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BotonAtras.css';

const BackButton = () => {
  // Inicializa el navigate
  const navigate = useNavigate();

  // Función para volver a la página anterior
  const goBack = () => {
    navigate(-1); // -1 significa ir a la página anterior en el historial
  };

  return (
    <button onClick={goBack} className='boton-atras'>
      Volver
    </button>
  );
};

export default BackButton;
