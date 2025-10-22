import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Inicio from './pages/inicio';
import Catalogo from './pages/catalogo';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import PanelVendedora from './pages/PanelVendedora';

import './App.css';

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar usuario={usuario} setUsuario={setUsuario} />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/login" element={<Login setUsuario={setUsuario} />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/panel-vendedora" element={<PanelVendedora />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
