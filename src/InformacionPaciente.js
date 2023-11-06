import React, { useState } from 'react';

function InformacionPaciente({ onGuardarInformacion }) {
  const [formData, setFormData] = useState({
    paciente: '',
    fechaMedicion: '',
    especie: '',
    raza: '',
    color: '',
    sexo: '',
    edad: '',
    tipoAtencion: '',
    tutor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const guardarInformacion = () => {
    onGuardarInformacion(formData);
  };

  return (
    <div>
      <h2>1. INFORMACION DEL PACIENTE:</h2>
      <fieldset>
        <legend>PACIENTE</legend>
        <label>PACIENTE:</label>
        <input
          type="text"
          name="paciente"
          value={formData.paciente}
          onChange={handleChange}
        />
        <label>FECHA DE MEDICIÓN:</label>
        <input
          type="text"
          name="fechaMedicion"
          value={formData.fechaMedicion}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <legend>ESPECIE Y RAZA</legend>
        <label>ESPECIE:</label>
        <input
          type="text"
          name="especie"
          value={formData.especie}
          onChange={handleChange}
        />
        <label>RAZA:</label>
        <input
          type="text"
          name="raza"
          value={formData.raza}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <legend>COLOR Y SEXO</legend>
        <label>COLOR:</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <label>SEXO:</label>
        <input
          type="text"
          name="sexo"
          value={formData.sexo}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <legend>EDAD Y TIPO DE ATENCIÓN</legend>
        <label>EDAD:</label>
        <input
          type="text"
          name="edad"
          value={formData.edad}
          onChange={handleChange}
        />
        <label>TIPO ATENCIÓN:</label>
        <input
          type="text"
          name="tipoAtencion"
          value={formData.tipoAtencion}
          onChange={handleChange}
        />
      </fieldset>

      <fieldset>
        <legend>TUTOR</legend>
        <label>TUTOR:</label>
        <input
          type="text"
          name="tutor"
          value={formData.tutor}
          onChange={handleChange}
        />
      </fieldset>
      <button onClick={guardarInformacion}>Guardar Información</button>
    </div>
  );
}

export default InformacionPaciente;
