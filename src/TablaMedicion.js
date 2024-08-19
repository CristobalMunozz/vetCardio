import React, { useState } from 'react';

function TablaMedicion({ onGuardarTablaMedicion }) {
  const [mediciones, setMediciones] = useState([
    { pas: '', pad: '', pam: '', fc: '' },
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
    <div>
      <h2>3. TABLA DE MEDICIÓN:</h2>
      <table>
        <thead>
          <tr>
            <th></th>

            <th>PAS</th>
            <th>PAD</th>
            <th>PAM</th>
            <th>FC</th>
          </tr>
        </thead>
        <tbody>
  {mediciones.map((medida, index) => (
    <tr key={index}>
      <td>{index + 1}.</td>


      <td>
        <input
          type="number"
          value={medida.pas}
          onChange={(e) => handleChange(e, index, 'pas')}
        />
      </td>
      <td>
        <input
          type="number"
          value={medida.pad}
          onChange={(e) => handleChange(e, index, 'pad')}
        />
      </td>
      <td>
        <input
          type="number"
          value={medida.pam}
          onChange={(e) => handleChange(e, index, 'pam')}
        />
      </td>
      <td>
        <input
          type="number"
          value={medida.fc}
          onChange={(e) => handleChange(e, index, 'fc')}
        />
      </td>
    </tr>
  ))}
  <tr>
    <td>PROMEDIO </td>

    <td>{calcularPromedio('pas')}</td>
    <td>{calcularPromedio('pad')}</td>
    <td>{calcularPromedio('pam')}</td>
    <td>{calcularPromedio('fc')}</td>
  </tr>
</tbody>

      </table>
    
    </div>
  );
}

export default TablaMedicion;
