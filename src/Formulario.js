import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import InformacionPaciente from "./InformacionPaciente";
import Antecedentes from "./Antecedentes";
import TablaMedicion from "./TablaMedicion";
import "./Formulario.css";
import ChartComponent from './ChartComponent';
import Footer from './Footer';
import qrcode from './assets/img/qrcode (1).png';




function Formulario() {


  const [informacionPaciente, setInformacionPaciente] = useState({});
  const [infoAntecedentes, setAntecedentes] = useState('');
  const [mediciones, setMediciones] = useState([
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' }
  ]);

  const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};






  const handleGuardarInformacion = (data) => {
    setInformacionPaciente(data);
  };

  const handleGuardarAntecedentes = (data) => {
    setAntecedentes(data);
  };

  const handleGuardarTablaMedicion = (data) => {
    setMediciones(data);
  };



  const generarPDF = () => {
    const doc = new jsPDF();
    const colorFondo = [200, 220, 255];
    doc.setFillColor(...colorFondo);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
    doc.setFontSize(20);
    doc.text("INFORME DE PRESIÓN ARTERIAL", 95, 15,'center');
    doc.setFontSize(14);
    doc.text("Moniveterinaria.cl", 20, 25);
    doc.text("Servicio: Presión en casa vet", 120,25);




  
    doc.setFontSize(14);
    doc.text("1. Información del Paciente", 20, 35);
    doc.setFontSize(12);
    const fechaMedicion = formatDate(informacionPaciente.fechaMedicion || new Date().toISOString());
    const infoPacienteData = [
      ["Paciente:", informacionPaciente.paciente],
      ["Fecha de Medición:", fechaMedicion],
      ["Especie:", informacionPaciente.especie],
      ["Raza:", informacionPaciente.raza],
      ["Color:", informacionPaciente.color],
      ["Sexo:", informacionPaciente.sexo],
      ["Edad:", informacionPaciente.edad],
      ["Tipo de Atención:", informacionPaciente.tipoAtencion],
      ["Tutor:", informacionPaciente.tutor],
      ["Medico Requirente:", informacionPaciente.medicorequirente ]
    ];
  
    doc.autoTable({
      body: infoPacienteData,
      startY: 40,
      styles: { fontSize: 12 },
      columnStyles: {
        0: { fontStyle: "bold" },
      },
    });
  
    // Agregar "Antecedentes"
    doc.setFontSize(14);
    doc.text("2. ANTECEDENTES:", 20, doc.autoTable.previous.finalY + 10);
    doc.setFontSize(12);
  
    if (infoAntecedentes && infoAntecedentes.trim() !== "") {
      const antecedentesData = [["Antecedentes:", infoAntecedentes]];
  
      doc.autoTable({
        body: antecedentesData,
        startY: doc.autoTable.previous.finalY + 20,
        styles: { fontSize: 12 },
        columnStyles: {
          0: { fontStyle: "bold" },
        }
      });
    }
  
    // Añadir la tabla de medición de presión
    doc.setFontSize(14);
    doc.text("3. TABLA DE MEDICIÓN DE PRESIÓN", 20, doc.autoTable.previous.finalY + 10);
    doc.setFontSize(12);
  
    const promedioPas = calcularPromedio('pas');
    const promedioPad = calcularPromedio('pad');
    const promedioPam = calcularPromedio('pam');
    const promedioFc = calcularPromedio('fc');
  
    const tableData = mediciones.map((medida, index) => [
      index + 1,
      medida.pas,
      medida.pad,
      medida.pam,
      medida.fc,
    ]);
  
    doc.autoTable({
      head: [['Nº', 'PAS', 'PAD', 'PAM', 'FC']],
      body: tableData,
      startY: doc.autoTable.previous.finalY + 20,
    });
   
    doc.setFontSize(14);
doc.text("Promedio:", 13, doc.autoTable.previous.finalY + 10);

// PAS
doc.setFontSize(14);
doc.text(`PAS: ${promedioPas}`, 37, doc.autoTable.previous.finalY + 10);
doc.setFontSize(10);  // Disminuye el tamaño de "mmHg"
doc.text("mmHg", doc.getTextWidth(`PAS: ${promedioPas}`) + 45, doc.autoTable.previous.finalY + 10);

// PAD
doc.setFontSize(14);
doc.text(`PAD: ${promedioPad}`, 77, doc.autoTable.previous.finalY + 10);
doc.setFontSize(10);  // Disminuye el tamaño de "mmHg"
doc.text("mmHg", doc.getTextWidth(`PAD: ${promedioPad}`) + 86, doc.autoTable.previous.finalY + 10);

// PAM
doc.setFontSize(14);
doc.text(`PAM: ${promedioPam}`, 122, doc.autoTable.previous.finalY + 10);
doc.setFontSize(10);  // Disminuye el tamaño de "mmHg"
doc.text("mmHg", doc.getTextWidth(`PAM: ${promedioPam}`) + 130, doc.autoTable.previous.finalY + 10);

// FC
doc.setFontSize(14);
doc.text(`FC: ${promedioFc}`, 165, doc.autoTable.previous.finalY + 10);
doc.setFontSize(10);  // Disminuye el tamaño de "lpm"
doc.text("lpm", doc.getTextWidth(`FC: ${promedioFc}`) + 172, doc.autoTable.previous.finalY + 10);

const footerText = "mmHH = milimetros de Mercurio, lpm = latidos por minuto .   Examen de toma de presión a domicilio, realizado con equipo SUNTech30, según las normas establecidas por fabricante y profesional de médico veterinario.";
const pageHeight = doc.internal.pageSize.height;
const marginBottom = 10;

doc.setFontSize(9);
const footerLines = doc.splitTextToSize(footerText, 170);
let yPosition = pageHeight - marginBottom;
const interlineado = 5;

footerLines.reverse().forEach((line) => {
  doc.text(line, 20, yPosition);
  yPosition -= interlineado;
});

  
    // Agregar una nueva página para el gráfico y el pie de página
    doc.addPage();
  
    doc.setFontSize(14);
    doc.text("4. GRÁFICO PRESIONES", 20, 20);
    doc.setFontSize(12);
  
    const canvas = document.querySelector('canvas');
    const chartBase64 = canvas.toDataURL('image/png');
    doc.addImage(chartBase64, 'PNG', 20, 30, 180, 110);
  
  // Agregar pie de firma
  doc.setFontSize(12);
  doc.text("Moniveterinaria.cl", 20, doc.internal.pageSize.height - 30);
  doc.text("Servicio: Presión en casa vet", 20, doc.internal.pageSize.height - 20);

  // Agregar QR code
  doc.addImage(qrcode, 'PNG', 160, doc.internal.pageSize.height - 50, 30, 30);


    const pacienteNombre = informacionPaciente.paciente || "PacienteDesconocido";

    const nombreArchivo = `${pacienteNombre}_${fechaMedicion}.pdf`.replace(/[/\\?%*:|"<>]/g, '_');
    doc.save(nombreArchivo);
  };
  

  const calcularPromedio = (columna) => {
    const valores = mediciones.map((medida) => Number(medida[columna]) || 0);
    const promedio = valores.reduce((acc, curr) => acc + curr, 0) / valores.length;
    return promedio.toFixed(1);
  };

  return (
    <div className="formulario-container">
      <h1 >INFORME MEDICIÓN DE PRESIÓN ARTERIAL</h1>
      <InformacionPaciente onGuardarInformacion={handleGuardarInformacion} />
      <Antecedentes onGuardarAntecedente={handleGuardarAntecedentes} />
      <TablaMedicion onGuardarTablaMedicion={handleGuardarTablaMedicion} />
      <Footer />
      <ChartComponent data={mediciones} />
      <button onClick={generarPDF}>Generar PDF</button>
     
    </div>
    
  );
}

export default Formulario;
