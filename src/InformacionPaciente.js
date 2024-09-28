import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Camera, CameraResultType } from "@capacitor/camera";

function InformacionPaciente({ onGuardarInformacion }) {
  const [formData, setFormData] = useState({
    paciente: "",
    fechaMedicion: "",
    especie: "",
    raza: "",
    color: "",
    sexo: "",
    edad: "",
    tipoAtencion: "",
    tutor: "",
    medicorequirente: "",
    foto: "",
  });

  const [foto, setFoto] = useState(null); // Guardar la foto capturada

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para capturar la foto usando la cámara
  const capturarFoto = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: "camera",
        quality: 90,
      });
      setFoto(image.webPath); // Guardar la ruta de la imagen
      setFormData({ ...formData, foto: image.webPath }); // Guardar la foto en formData
    } catch (error) {
      console.error("Error al capturar la foto:", error);
    }
  };

  // Función para seleccionar una imagen de la galería
  const seleccionarFoto = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFoto(reader.result); // Actualizar la vista previa
        setFormData({ ...formData, foto: reader.result }); // Guardar la foto en formData
      };
      reader.readAsDataURL(file); // Leer la imagen como URL de datos
    }
  };

  const guardarInformacion = () => {
    onGuardarInformacion(formData);
  };

  return (
    <div className="container">
      <h2 className="mb-4">1. INFORMACION DEL PACIENTE:</h2>

      <div className="row">
        <div className="col-md-6">
          <fieldset className="mb-4">
            <div className="mb-3">
              <label htmlFor="paciente" className="form-label">
                PACIENTE:
              </label>
              <input
                type="text"
                className="form-control"
                id="paciente"
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fechaMedicion" className="form-label">
                FECHA DE MEDICIÓN:
              </label>
              <input
                type="datetime-local"
                className="form-control"
                id="fechaMedicion"
                name="fechaMedicion"
                value={formData.fechaMedicion}
                onChange={handleChange}
              />
            </div>
          </fieldset>
        </div>

        <div className="col-md-6">
          <fieldset className="mb-4">
            <div className="mb-3">
              <label htmlFor="especie" className="form-label">
                ESPECIE:
              </label>
              <input
                type="text"
                className="form-control"
                id="especie"
                name="especie"
                value={formData.especie}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="raza" className="form-label">
                RAZA:
              </label>
              <input
                type="text"
                className="form-control"
                id="raza"
                name="raza"
                value={formData.raza}
                onChange={handleChange}
              />
            </div>
          </fieldset>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <fieldset className="mb-4">
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                COLOR:
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sexo" className="form-label">
                SEXO:
              </label>
              <input
                type="text"
                className="form-control"
                id="sexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
              />
            </div>
          </fieldset>
        </div>

        <div className="col-md-6">
          <fieldset className="mb-4">
            <div className="mb-3">
              <label htmlFor="edad" className="form-label">
                EDAD:
              </label>
              <input
                type="text"
                className="form-control"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoAtencion" className="form-label">
                TIPO ATENCIÓN:
              </label>
              <input
                type="text"
                className="form-control"
                id="tipoAtencion"
                name="tipoAtencion"
                value={formData.tipoAtencion}
                onChange={handleChange}
              />
            </div>
          </fieldset>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <fieldset>
            <div className="mb-3">
              <label htmlFor="tutor" className="form-label">
                TUTOR:
              </label>
              <input
                type="text"
                className="form-control"
                id="tutor"
                name="tutor"
                value={formData.tutor}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="medicorequirente" className="form-label">
                Medico Veterinario requirente:
              </label>
              <input
                type="text"
                className="form-control"
                id="medicorequirente"
                name="medicorequirente" // Asegúrate de que coincida con la clave en formData
                value={formData.medicorequirente}
                onChange={handleChange}
              />
            </div>
          </fieldset>
          <div className="col-md-6 text-center">
          <button onClick={capturarFoto} className="btn btn-primary mb-3">Capturar Foto</button>
          <input
            type="file"
            accept="image/*"
            onChange={seleccionarFoto}
            className="mb-3"
          />
          {foto && (
            <img
              src={foto}
              alt="Foto del paciente"
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%', // Bordes circulares
                objectFit: 'cover',
              }}
            />
          )}
        </div>
        </div>
      </div>
      <button onClick={guardarInformacion}>Guardar Información</button>
    </div>
  );
}

export default InformacionPaciente;
