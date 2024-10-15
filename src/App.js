import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Formulario from './components/Formulario';
import FormularioPages from './pages/FormularioPage';
import Solicitudes from './components/getSolicitudes';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/formulario" element={<FormularioPages />} />
              <Route path="/getSolicitudes" element={<Solicitudes />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;


