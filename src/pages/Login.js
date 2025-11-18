import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function Login({ setUsuario }) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', {
        correo: correo.trim().toLowerCase(),
        contrasena: contrasena.trim()
      });

      console.log('✅ Respuesta del servidor:', res.data);

      const usuario = res.data;
      setMensaje(`Bienvenido ${usuario.nombre} (${usuario.rol})`);

      // Guardar sesión
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setUsuario(usuario);

      // Redirigir según rol
      if (usuario.rol === 'administrador') {
        navigate('/admin');
      } else if (usuario.rol === 'vendedor' || usuario.rol === 'vendedora') {
        navigate('/panel-vendedora');
      } else {
        navigate('/catalogo');
      }
    } catch (err) {
      console.error('❌ Error en login:', err.response?.data || err.message);
      setMensaje('❌ Credenciales incorrectas o usuario no encontrado');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title"> Iniciar sesión</h2>
        <form onSubmit={manejarLogin} className="login-form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Ingresar</button>
        </form>
        {mensaje && <p className="login-message">{mensaje}</p>}
      </div>
    </div>
  );
}

export default Login;