import { Link, useNavigate } from 'react-router-dom';

function Navbar({ usuario, setUsuario }) {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#eee',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">Inicio</Link>
        <Link to="/catalogo">Catálogo</Link>
        {!usuario && <Link to="/login">Iniciar sesión</Link>}
      </div>

      {usuario && (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>👤 {usuario.nombre}</span>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;