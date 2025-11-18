import React, { useState, useEffect } from "react";
import "../App.css";

function ProductosPage() {
    const [productos, setProductos] = useState([]);
 const [categorias, setCategorias] = useState([]);
const [creadoras, setCreadoras] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: "",
    Precio: "",
    Descripcion: "",
    ImagenUrl: "",
    CategoriaId: "",
    CreadoraId: ""
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const agregarProducto = () => {
    fetch("http://localhost:3001/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(nuevo => {
        setProductos([...productos, nuevo]);
        setFormData({
          Nombre: "",
          Precio: "",
          Descripcion: "",
          ImagenUrl: "",
          CategoriaId: "",
          CreadoraId: ""
        });
      });
  };

useEffect(() => {
  fetch("http://localhost:3001/api/productos")
    .then(res => res.json())
    .then(data => setProductos(data));

  fetch("http://localhost:3001/api/categorias")
    .then(res => res.json())
    .then(data => setCategorias(data));

  fetch("http://localhost:3001/api/creadoras")
   .then(res => res.json())
  .then(data => {
    if (Array.isArray(data)) {
      setCreadoras(data);
    } else {
      console.error("❌ La respuesta de /api/creadoras no es un arreglo:", data);
      setCreadoras([]);
    }
  })
  .catch(err => {
    console.error("❌ Error al cargar creadoras:", err);
    setCreadoras([]);
  });
}, []);

  const eliminarProducto = (id) => {
    fetch(`http://localhost:3001/api/productos/${id}`, {
      method: "DELETE"
    }).then(() => {
      setProductos(productos.filter(p => p.Id !== id));
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Gestión de Productos</h1>

      <div className="form-grid">
        <input
          type="text"
          name="Nombre"
          placeholder="Nombre"
          value={formData.Nombre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="Precio"
          placeholder="Precio"
          value={formData.Precio}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Descripcion"
          placeholder="Descripción"
          value={formData.Descripcion}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ImagenUrl"
          placeholder="Imagen URL"
          value={formData.ImagenUrl}
          onChange={handleChange}
        />
        <label>
  Categoría:
  <select name="CategoriaId" value={formData.CategoriaId} onChange={handleChange}>
    <option value="">Seleccionar categoría</option>
    {categorias.map(c => (
      <option key={c.Id} value={c.Id}>{c.Nombre}</option>
    ))}
  </select>
</label>
<label>
  Creadora:
  <select name="CreadoraId" value={formData.CreadoraId} onChange={handleChange}>
    <option value="">Seleccionar creadora</option>
    {creadoras.map(c => (
      <option key={c.Id} value={c.Id}>{c.Nombre}</option>
    ))}
  </select>
</label>

        <button onClick={agregarProducto}>Agregar</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.Id}>
              <td>{p.Nombre}</td>
              <td>${p.Precio}</td>
              <td className="action-buttons">
                <button className="delete" onClick={() => eliminarProducto(p.Id)}>Eliminar</button>
                <button className="edit">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosPage;