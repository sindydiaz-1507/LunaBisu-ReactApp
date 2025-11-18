import React, { useEffect, useState } from "react";
import "../App.css";

function ReportesPage() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/reportes")
      .then(res => res.json())
      .then(data => setReportes(data));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Reportes</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Pedido ID</th>
            <th>Cliente ID</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map(r => (
            <tr key={r.Id}>
              <td>{r.Id}</td>
              <td>{r.ClienteId}</td>
              <td>{new Date(r.Fecha).toLocaleString()}</td>
              <td>{r.Estado}</td>
              <td>${r.Total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportesPage;