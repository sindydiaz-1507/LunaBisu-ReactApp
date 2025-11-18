const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware CORS y JSON
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Logging de rutas
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// Conexión a MariaDB (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lunabisu'
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a MariaDB desde XAMPP');
  }
});

// -------------------- LOGIN --------------------
app.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;
  console.log('📩 Datos recibidos:', correo, contrasena);

  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const query = 'SELECT id, nombre, rol FROM usuarios WHERE correo = ? AND contrasena = ?';
  db.query(query, [correo.trim().toLowerCase(), contrasena.trim()], (err, results) => {
    if (err) {
      console.error('❌ Error en la consulta:', err.message);
      return res.status(500).send('Error en el servidor');
    }

    console.log('📦 Resultado de la consulta:', results);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    res.json(results[0]);
  });
});

// -------------------- PRODUCTOS --------------------
app.get('/api/productos', (req, res) => {
  const consulta = 'SELECT * FROM productos';
  db.query(consulta, (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener productos:', err.message);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    console.log('📦 Productos enviados:', resultados);
    res.json(resultados);
  });
});

// -------------------- USUARIOS --------------------
app.get('/api/usuarios', (req, res) => {
  const consulta = 'SELECT * FROM usuarios';
  db.query(consulta, (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener usuarios:', err.message);
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    console.log('📦 Usuarios enviados:', resultados);
    res.json(resultados);
  });
});

// -------------------- REPORTES --------------------
app.get('/api/reportes', (req, res) => {
  const consulta = `
    SELECT p.Id, p.ClienteId, p.Fecha, p.Estado, SUM(d.Subtotal) AS Total
    FROM pedidos p
    JOIN detallepedido d ON p.Id = d.PedidoId
    GROUP BY p.Id, p.ClienteId, p.Fecha, p.Estado
  `;
  db.query(consulta, (err, resultados) => {
    if (err) {
      console.error('❌ Error al obtener reportes:', err.message);
      return res.status(500).json({ error: 'Error al obtener reportes' });
    }
    console.log('📦 Reportes enviados:', resultados);
    res.json(resultados);
  });
});

app.get('/api/categorias', (req, res) => {
  db.query('SELECT Id, Nombre FROM categorias', (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener categorías' });
    res.json(resultados);
  });
});

app.get('/api/creadoras', (req, res) => {
  db.query('SELECT Id, Nombre FROM creadoras', (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al obtener creadoras' });
    res.json(resultados);
  });
});

// -------------------- INICIAR SERVIDOR --------------------
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});