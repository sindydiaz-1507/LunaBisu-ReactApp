const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// Conexión a MariaDB (XAMPP)
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // si no pusiste contraseña en XAMPP, dejalo vacío
  database: 'lunabisu'
});

// Verificar conexión a la base de datos
db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a MariaDB desde XAMPP');
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('🚀 Backend LunaBisu funcionando correctamente');
});

// Ruta de productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).send('Error al obtener productos');
    res.json(results);
  });
});

app.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;
  console.log('📩 Datos recibidos:', correo, contrasena);

  const query = 'SELECT id, nombre, rol FROM usuarios WHERE correo = ? AND contrasena = ?';
  db.query(query, [correo, contrasena], (err, results) => {
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



// Iniciar servidor
app.listen(3001, () => {
  console.log('✅ Servidor corriendo en puerto 3001');
});