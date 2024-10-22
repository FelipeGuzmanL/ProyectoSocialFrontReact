import React from 'react';
// import RequestForm from '../components/RequestForm';
// import RequestList from '../components/RequestList';
// import SearchRequest from '../components/SearchRequest';
// import SearchRequests from '../components/SearchRequests';
import Navbar from '../components/Navbar';
import EditRequest from '../components/EditRequest';

function FormularioEdit({ setAuthenticated }) {
  return (
    <div>
      {/* <Navbar setAuthenticated={setAuthenticated} /> */}
      <h1>Lista de Formularios</h1>
      {/* <RequestForm /> */}
      {/* <RequestList /> */}
      <EditRequest />
    </div>
  );
}

export default FormularioEdit;
