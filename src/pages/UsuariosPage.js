import React, { useEffect, useState } from "react";
import "../App.css";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    Nombre: "",
    Correo: "",
    Contrasena: "",
    Rol: ""
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const agregarUsuario = () => {
    fetch("http://localhost:3001/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(nuevo => {
        setUsuarios([...usuarios, nuevo]);
        setFormData({
          Nombre: "",
          Correo: "",
          Contrasena: "",
          Rol: ""
        });
      });
  };

  const eliminarUsuario = (id) => {
    fetch(`http://localhost:3001/api/usuarios/${id}`, {
      method: "DELETE"
    }).then(() => {
      setUsuarios(usuarios.filter(u => u.Id !== id));
    });
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Gestión de Usuarios</h1>

      <div className="form-grid">
        <input
          type="text"
          name="Nombre"
          placeholder="Nombre"
          value={formData.Nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="Correo"
          placeholder="Correo"
          value={formData.Correo}
          onChange={handleChange}
        />
        <input
          type="password"
          name="Contrasena"
          placeholder="Contraseña"
          value={formData.Contrasena}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Rol"
          placeholder="Rol"
          value={formData.Rol}
          onChange={handleChange}
        />
        <button onClick={agregarUsuario}>Agregar</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.Id}>
              <td>{u.Nombre}</td>
              <td>{u.Correo}</td>
              <td>{u.Rol}</td>
              <td className="action-buttons">
                <button className="delete" onClick={() => eliminarUsuario(u.Id)}>Eliminar</button>
                <button className="edit">Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosPage;