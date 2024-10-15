import './App.css';

import React, { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import HomePage from './pages/HomePage';

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginForm setAuthenticated={setAuthenticated} />
      ) : (
        <HomePage setAuthenticated={setAuthenticated} />
      )}
    </div>
  );
}

export default App;



