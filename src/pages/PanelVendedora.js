import React from 'react';
import '../App.css';

function PanelVendedora() {
  return (
    <div className="vendedora-container">
      <div className="vendedora-card">
        <h2 className="vendedora-title"> Panel de Vendedora</h2>
        <p className="vendedora-subtitle">Bienvenida. Aquí podés consultar tus pedidos y facturas.</p>

        <div className="vendedora-grid">
          <div className="vendedora-box">
            <h3> Pedidos</h3>
            <p>Listado de pedidos realizados por clientes.</p>
            <button className="vendedora-button">Ver pedidos</button>
          </div>
          <div className="vendedora-box">
            <h3> Facturas</h3>
            <p>Consulta de facturas emitidas.</p>
            <button className="vendedora-button">Ver facturas</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelVendedora;