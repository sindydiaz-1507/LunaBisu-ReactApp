import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ usuario, setUsuario }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Inicio</Link>
        
        {!usuario && <Link to="/login" className="navbar-link">Iniciar sesión</Link>}
      </div>

      {usuario && (
        <div className="navbar-user">
          <span className="navbar-usuario"> {usuario.nombre}</span>
          <button className="navbar-button" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;