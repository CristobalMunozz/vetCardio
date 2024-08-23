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

  const calcularPromedio = (columna) => {
    const valores = mediciones.map((medida) => Number(medida[columna]) || 0);
    const promedio = valores.reduce((acc, curr) => acc + curr, 0) / valores.length;
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
