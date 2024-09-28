import React, { useState } from 'react';

const TablaMedicion = ({ onGuardarTablaMedicion }) => {
  const [mediciones, setMediciones] = useState([
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
  ]);

  const handleChange = (e, rowIndex, columnName) => {
    const newMediciones = [...mediciones];
    newMediciones[rowIndex][columnName] = e.target.value;
    setMediciones(newMediciones);
    onGuardarTablaMedicion(newMediciones); // Llamar a la función para guardar los datos en Formulario
  };
// calcular promedio de las columnas
  const calcularPromedio = (columna) => {
    // Filtramos los valores que son válidos, es decir, aquellos que no son 0 o NaN
    const valores = mediciones
      .map((medida) => Number(medida[columna]))  // Convertimos a número
      .filter((valor) => !isNaN(valor) && valor !== 0); // Filtramos los valores inválidos (NaN o 0)
  
    const suma = valores.reduce((acc, curr) => acc + curr, 0);
    
    // Evitamos división por cero si no hay valores válidos
    const promedio = valores.length > 0 ? suma / valores.length : 0;
  
    return promedio.toFixed(1);
  };
  

  return (
    <div className="container">
      <h2 className="mb-4">3. TABLA DE MEDICIÓN:</h2>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>PAS mmHg</th>
            <th>PAD mmHg</th>
            <th>PAM mmHg</th>
            <th>FC  lpm</th>
          </tr>
        </thead>
        <tbody>
          {mediciones.map((medida, index) => (
            <tr key={index}>
              <td>{index + 1}.</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={medida.pas}
                  onChange={(e) => handleChange(e, index, 'pas')}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={medida.pad}
                  onChange={(e) => handleChange(e, index, 'pad')}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={medida.pam}
                  onChange={(e) => handleChange(e, index, 'pam')}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={medida.fc}
                  onChange={(e) => handleChange(e, index, 'fc')}
                />
              </td>
            </tr>
          ))}
          <tr>
            <td>PROMEDIO</td>
            <td>{calcularPromedio('pas')} mmgHg</td>
            <td>{calcularPromedio('pad')} mmgHg</td>
            <td>{calcularPromedio('pam')} mmgHg</td>
            <td>{calcularPromedio('fc')}  lpm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaMedicion;
