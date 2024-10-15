import React from 'react';
import RequestForm from '../components/RequestForm';
import RequestList from '../components/RequestList';
// import SearchRequests from '../components/SearchRequests';
import Navbar from '../components/Navbar';

function HomePage({ setAuthenticated }) {
  return (
    <div>
      <Navbar setAuthenticated={setAuthenticated} />
      <h1>Menú Principal</h1>
      <RequestForm />
      <RequestList />
      {/* <SearchRequests /> */}
    </div>
  );
}

export default HomePage;
