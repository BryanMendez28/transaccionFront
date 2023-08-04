import React, { useState, useEffect } from 'react';

const TablaRegistrosConsultados = ({ fechaInicio,  fechaFin,horaInicio, horaFin, puntoDeVenta, codeProduct }) => {
  const [registrosConsultados, setRegistrosConsultados] = useState([]);

  useEffect(() => {
    const fetchRegistrosConsultados = async () => {
      try {
        const consultaParams = `fechaInicio=${encodeURIComponent(fechaInicio)}&fechaFin=${encodeURIComponent(fechaFin)}&horaInicio=${encodeURIComponent(horaInicio)}&horaFin=${encodeURIComponent(horaFin)}&nombreMaquinaFiltro=${encodeURIComponent(puntoDeVenta)}&codeProductFiltro=${encodeURIComponent(codeProduct)}`;
        const response = await fetch(`http://localhost:9000/api/consulta-con-filtro?${consultaParams}`);
      
        if (response.ok) {
          const data = await response.json();
          setRegistrosConsultados(data);
        } else {
          console.error('Error al realizar la consulta');
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchRegistrosConsultados();
  }, [fechaInicio, horaInicio, fechaFin, horaFin, puntoDeVenta, codeProduct]);

  return (
    <div>
      <h2>Tabla de Registros Consultados</h2>
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>puntoDeVenta</th>
              <th>Carril</th>
              <th>Fecha</th>
              <th>Hora</th>
            </tr>
          </thead>
          <tbody>
            {registrosConsultados.map((registro, index) => (
              <tr key={index}>
                <td>{registro.cliente_id}</td>
                <td>{registro.ProductCodeInMap}</td>
                <td>{new Date(registro.MachineSeTimeDateOnly).toLocaleDateString('es-ES')}</td>

                <td>{registro.MachineSeTimeTimeOnly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaRegistrosConsultados;
