import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Inicio from './pages/inicio';
import Catalogo from './pages/catalogo';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import PanelVendedora from './pages/PanelVendedora';

// 🔧 Importamos las nuevas páginas
import ProductosPage from './pages/ProductosPage';
import UsuariosPage from './pages/UsuariosPage';
import ReportesPage from './pages/ReportesPage';

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

          {/* 🔐 Panel de administración solo para administradores */}
          <Route
            path="/admin"
            element={
              usuario?.rol === 'administrador'
                ? <AdminPanel />
                : <Login setUsuario={setUsuario} />
            }
          />
          <Route
            path="/productos"
            element={
              usuario?.rol === 'administrador'
                ? <ProductosPage />
                : <Login setUsuario={setUsuario} />
            }
          />
          <Route
            path="/usuarios"
            element={
              usuario?.rol === 'administrador'
                ? <UsuariosPage />
                : <Login setUsuario={setUsuario} />
            }
          />
          <Route
            path="/reportes"
            element={
              usuario?.rol === 'administrador'
                ? <ReportesPage />
                : <Login setUsuario={setUsuario} />
            }
          />

          {/* 🔐 Panel de vendedora solo para rol vendedor/vendedora */}
          <Route
            path="/panel-vendedora"
            element={
              usuario?.rol === 'vendedora' || usuario?.rol === 'vendedor'
                ? <PanelVendedora />
                : <Login setUsuario={setUsuario} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;