import { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

function Catalogo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/productos')
      .then(res => setProductos(res.data))
      .catch(err => console.error('❌ Error al cargar productos:', err));
  }, []);

  return (
    <div className="catalogo-container">
      <h2 className="catalogo-title"> Catálogo LunaBisu</h2>
      <div className="catalogo-grid">
        {productos.map(producto => (
          <div key={producto.Id} className="catalogo-card">
            {producto.ImagenUrl && (
              <img src={producto.ImagenUrl} alt={producto.Nombre} className="catalogo-img" />
            )}
            <h3>{producto.Nombre}</h3>
            <p>{producto.Descripcion}</p>
            <p className="catalogo-precio"> C$ {producto.Precio}</p>
            <button className="catalogo-button">Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;