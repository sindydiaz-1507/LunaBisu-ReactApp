import '../App.css';
import { useNavigate } from "react-router-dom"; // 👈 Importa useNavigate

function AdminPanel() {
  const navigate = useNavigate(); // 👈 Inicializa el hook

  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title"> Panel de Administración</h2>
        <p className="admin-subtitle">Bienvenida, Admin. Aquí podés gestionar el sistema.</p>

        <div className="admin-grid">
          <div className="admin-box">
            <h3> Productos</h3>
            <p>Ver, agregar o editar productos.</p>
            <button 
              className="admin-button" 
              onClick={() => navigate("/productos")} // 👈 Acción
            >
              Ir a productos
            </button>
          </div>
          <div className="admin-box">
            <h3> Usuarios</h3>
            <p>Gestionar cuentas y roles.</p>
            <button 
              className="admin-button" 
              onClick={() => navigate("/usuarios")} // 👈 Acción
            >
              Ir a usuarios
            </button>
          </div>
          <div className="admin-box">
            <h3> Reportes</h3>
            <p>Visualizar ventas o facturas.</p>
            <button 
              className="admin-button" 
              onClick={() => navigate("/reportes")} // 👈 Acción
            >
              Ver ventas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;