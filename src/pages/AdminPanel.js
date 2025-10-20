function AdminPanel() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🛠️ Panel de Administración</h2>
        <p style={styles.subtitle}>Bienvenida, Admin. Aquí podés gestionar el sistema.</p>

        <div style={styles.grid}>
          <div style={styles.box}>
            <h3>📦 Productos</h3>
            <p>Ver, agregar o editar productos.</p>
            <button style={styles.button}>Ir a productos</button>
          </div>
          <div style={styles.box}>
            <h3>👥 Usuarios</h3>
            <p>Gestionar cuentas y roles.</p>
            <button style={styles.button}>Ir a usuarios</button>
          </div>
          <div style={styles.box}>
            <h3>📊 Reportes</h3>
            <p>Visualizar estadísticas y ventas.</p>
            <button style={styles.button}>Ver reportes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'linear-gradient(to right, #f0f4f8, #d9e2ec)',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '900px'
  },
  title: {
    fontSize: '1.8rem',
    marginBottom: '0.5rem',
    color: '#333'
  },
  subtitle: {
    fontSize: '1rem',
    marginBottom: '2rem',
    color: '#666'
  },
  grid: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap'
  },
  box: {
    flex: '1 1 250px',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default AdminPanel;