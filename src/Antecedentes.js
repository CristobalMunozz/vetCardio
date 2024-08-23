import React, { useState } from 'react';


function Antecedentes({ onGuardarAntecedente }) {
  const [informacionAdicional, setInformacionAdicional] = useState('');


  const handleChange = (e) => {
    setInformacionAdicional(e.target.value);
  };
  const guardarAntecedente = () => {
    onGuardarAntecedente(informacionAdicional);
  };



  return (
    <div>
      <h2>2. ANTECEDENTES:</h2>
      <p>Se realiza la toma de presion en un ambiente tranquilo...</p>
      <textarea
        rows="4"
        cols="50"
        value={informacionAdicional}
        onChange={handleChange}
        placeholder="Escribe información adicional aquí"
      />
      <button onClick={guardarAntecedente}>Guardar Antecedentes</button>

    </div>
  );
};

export default Antecedentes;

