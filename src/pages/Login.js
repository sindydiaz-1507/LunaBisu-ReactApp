import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/login', {
        correo,
        contrasena
      });

      const usuario = res.data;
      setMensaje(`Bienvenido ${usuario.nombre} (${usuario.rol})`);

      if (usuario.rol === 'administrador') {
        navigate('/admin');
      } else if (usuario.rol === 'vendedor' || usuario.rol === 'vendedora') {
        navigate('/panel-vendedora');
      } else {
        navigate('/catalogo');
      }
    } catch (err) {
      setMensaje('❌ Credenciales incorrectas o usuario no encontrado');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🔐 Iniciar sesión</h2>
        <form onSubmit={manejarLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Ingresar</button>
        </form>
        {mensaje && <p style={styles.message}>{mensaje}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  title: {
    marginBottom: '1.5rem',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  input: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  message: {
    marginTop: '1rem',
    color: '#d9534f',
    fontWeight: 'bold'
  }
};

export default Login;