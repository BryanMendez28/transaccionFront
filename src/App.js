import React, { useState,   } from 'react';
import './App.css';
import TablaRegistrosConsultados from './TablaRegistrosConsultados.js';
import TablaRegistroCarril from './TablaRegistroCarril';


const App = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [horaFin, setHoraFin] = useState('');
  const [puntoDeVenta, setPuntoDeVenta] = useState('');
  const [codeProduct, setCodeProduct] = useState('');
  const [totalPiezasVendidas, setTotalPiezasVendidas] = useState('');
  const [totalTarjetaCredito, setTotalTarjetaCredito] = useState('');
  const [totalEfectivo, setTotalEfectivo] = useState('');
  const [totalGastado, setTotalGastado] = useState('');
  const [totalGastadoTarjetaCredito, setTotalGastadoTarjetaCredito] = useState('');
  const [totalGastadoEfectivo, setTotalGastadoEfectivo] = useState('');

  const handleConsultar = async () => {
    try {
      // Construir la cadena de consulta manualmente
      const consultaParams = `fechaInicio=${encodeURIComponent(fechaInicio)}&horaInicio=${encodeURIComponent(horaInicio)}&fechaFin=${encodeURIComponent(fechaFin)}&horaFin=${encodeURIComponent(horaFin)}&nombreMaquinaFiltro=${encodeURIComponent(puntoDeVenta)}&codeProductFiltro=${encodeURIComponent(codeProduct)}`;

      // Realizar la solicitud GET al backend con los parámetros en la URL
      const response = await fetch(`http://localhost:9000/api?${consultaParams}`);
    
      if (response.ok) {
        // Si la solicitud fue exitosa, obtener el resultado de las piezas vendidas
        const data = await response.json();
        setTotalPiezasVendidas(data.TotalPiezasVendidas);
        setTotalTarjetaCredito(data.TotalTarjetaCredito);
        setTotalEfectivo(data.TotalEfectivo);
        setTotalGastado(data.TotalGastado);
        setTotalGastadoTarjetaCredito(data.TotalGastadoTarjetaCredito);
        setTotalGastadoEfectivo(data.TotalGastadoEfectivo);
      } else {
        // Si hubo un error en la solicitud, mostrar el mensaje de error
        console.error('Error al realizar la consulta');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  

  return (
    <div className="container">
      <h1 className="title">Transacciones Nayax</h1>
      <div className="formContainer">
        <label className="label">
          Fecha de Inicio:
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} className="input" />
        </label>
       
       <label className="label">
          Fecha de Fin:
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} className="input" />
        </label> <label className="label">
          Hora de Inicio:
          <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} className="input" />
        </label>
        <label className="label">
          Hora de Fin:
          <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} className="input" />
        </label>
        <label className="label">
          Punto De Venta:
          <input type="text" value={puntoDeVenta} onChange={(e) => setPuntoDeVenta(e.target.value)} className="input" />
        </label>
        <label className="label">
          Carril:
          <input type="text" value={codeProduct} onChange={(e) => setCodeProduct(e.target.value)} className="input" />
        </label>
      
      </div>  <div className='buttonContainer'>
        <button type="button" onClick={handleConsultar} className="button">Consultar</button>
        </div>
      

      
      <div className="resultContainer">

 {/* Mostrar la tabla de registros consultados */}
{/* <TablaRegistrosConsultados
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          horaInicio={horaInicio}
          horaFin={horaFin}
          puntoDeVenta={puntoDeVenta}
          codeProduct={codeProduct}
        />
  */}

<TablaRegistroCarril
          fechaInicio={fechaInicio}
          fechaFin={fechaFin}
          horaInicio={horaInicio}
          horaFin={horaFin}
          cliente_id={puntoDeVenta}
       
        />

        {/* Mostrar la tabla de datos totales si los datos están disponibles */}
        {totalPiezasVendidas !== '' && (
          <div className="totalDataContainer">
            <h2>Datos Totales</h2>
            <table className="totalDataTable">
              <tbody>
                <tr>
                  <td>Total de piezas vendidas:</td> 
                     <td>Total de transacciones con tarjeta de crédito:</td> 
                      <td>Total de transacciones en efectivo:</td>
                      <td>Total gastado en todas las transacciones:</td>
                       <td>Total gastado con tarjeta de crédito:</td> 
                        <td>Total gastado en efectivo:</td>
                </tr>
                <tr>
                 <td>{totalPiezasVendidas}</td>
                  <td>{totalTarjetaCredito}</td>
                   <td>{totalEfectivo}</td> 
                   <td>{totalGastado}</td> 
                    <td>{totalGastadoTarjetaCredito}</td>
                     <td>{totalGastadoEfectivo}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
