import '../App.css';

function AdminPanel() {
  return (
    <div className="admin-container">
      <div className="admin-card">
        <h2 className="admin-title">🛠️ Panel de Administración</h2>
        <p className="admin-subtitle">Bienvenida, Admin. Aquí podés gestionar el sistema.</p>

        <div className="admin-grid">
          <div className="admin-box">
            <h3>📦 Productos</h3>
            <p>Ver, agregar o editar productos.</p>
            <button className="admin-button">Ir a productos</button>
          </div>
          <div className="admin-box">
            <h3>👥 Usuarios</h3>
            <p>Gestionar cuentas y roles.</p>
            <button className="admin-button">Ir a usuarios</button>
          </div>
          <div className="admin-box">
            <h3>📊 Reportes</h3>
            <p>Visualizar estadísticas y ventas.</p>
            <button className="admin-button">Ver reportes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;