import React, { useState, useEffect } from 'react';

const TablaRegistroCarril = ({ fechaInicio,  fechaFin,horaInicio, horaFin, cliente_id }) => {
  const [registroCarril, setRegistroCarril] = useState([]);

  useEffect(() => {
    const fetchRegistroCarril = async () => {
      try {
        const consultaParams = `fechaInicio=${encodeURIComponent(fechaInicio)}&fechaFin=${encodeURIComponent(fechaFin)}&horaInicio=${encodeURIComponent(horaInicio)}&horaFin=${encodeURIComponent(horaFin)}&cliente_id=${encodeURIComponent(cliente_id)}`;
        const response = await fetch(`http://localhost:9000/api/consulta-dinamica?${consultaParams}`);
      
        if (response.ok) {
          const data = await response.json();
          setRegistroCarril(data);
        } else {
          console.error('Error al realizar la consulta');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchRegistroCarril();
  }, [fechaInicio, horaInicio, fechaFin, horaFin, cliente_id]);

  return (
    <div>
      <h2>Carriles</h2>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>Carril</th>
              <th>PiezasVendidasEfectivo</th>
              <th>PiezasVendidasTarjetaDeCredito</th>
              <th>PiezasVendidasTotal</th>
              <th>VentaEfectivoTotal</th>
              <th>VentaTarjetaDeCreditoTotal</th>
              <th>VentaTotal</th>
            </tr>
          </thead>
          <tbody>
            {registroCarril.map((registro, index) => (
              <tr key={index}>
                <td>{registro.ProductCodeInMap}</td>
                <td>{registro.TotalRegistrosEfectivo}</td>
                <td>{registro.TotalRegistrosTarjetaCredito}</td>
                <td>{registro.TotalRegistros}</td>
                <td>{registro.TotalGastadoEfectivo}</td>
                <td>{registro.TotalGastadoTarjetaCredito}</td>
                <td>{registro.TotalCosto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaRegistroCarril;