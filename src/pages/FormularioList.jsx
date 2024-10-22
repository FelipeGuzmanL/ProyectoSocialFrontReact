import React from 'react';
// import RequestForm from '../components/RequestForm';
import RequestList from '../components/RequestList';
// import SearchRequests from '../components/SearchRequests';
import Navbar from '../components/Navbar';

function FormularioList({ setAuthenticated }) {
  return (
    <div>
      {/* <Navbar setAuthenticated={setAuthenticated} /> */}
      <h1>Lista de Formularios</h1>
      {/* <RequestForm /> */}
      <RequestList />
      {/* <SearchRequests /> */}
    </div>
  );
}

export default FormularioList;
