import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import InformacionPaciente from "./InformacionPaciente";
import Antecedentes from "./Antecedentes";
import TablaMedicion from "./TablaMedicion";
import "./Formulario.css"; // Importa el archivo CSS
import ChartComponent from './ChartComponent'; 



function Formulario() {
  const [informacionPaciente, setInformacionPaciente] = useState({});
  const [infoAntecedentes, setAntecedentes] = useState({}); 

  const [mediciones, setMediciones] = useState([
    { pas: '0', pad: '0', pam: '', fc: '0' },
    { pas: '0', pad: '0', pam: '', fc: '0' },
    { pas: '0', pad: '0', pam: '', fc: '0' },
    { pas: '0', pad: '0', pam: '', fc: '0' },
    { pas: '0', pad: '0', pam: '', fc: '0' },
    { pas: '0', pad: '0', pam: '', fc: '0' },
    { pas: '0', pad: '0', pam: '', fc: '0' },
    { pas: '0', pad: '0', pam: '', fc: '0' },
    { pas: '0', pad: '0', pam: '', fc: '0' },

  ]);
  

  const handleGuardarInformacion = (data) => {
    setInformacionPaciente(data);
  };

  const handleGuardarAntecedentes = (data) => {
    console.log('Datos de antecedentes recibidos:', data);
    setAntecedentes(data);
  };
  

  const handleGuardarTablaMedicion = (data) => {
    setMediciones(data);
  };

    // Función para formatear la fecha
    const formatearFecha = (fecha) => {
      const [year, month, day] = fecha.split("-");
      return `${day}-${month}-${year}`;
    };

  // generación del informe en PDF
  const generarPDF = () => {
    const doc = new jsPDF();
    const colorFondo = [200, 220, 255]; // RGB para un color azul claro
  doc.setFillColor(colorFondo[0], colorFondo[1], colorFondo[2]);

  // Agregar un rectángulo que cubra toda el área del documento
  doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');
  
    // Agregar el título al PDF
  
// Ajusta las coordenadas y el tamaño según sea necesario
    doc.setFontSize(16);
    doc.text("INFORME DE PRESIÓN ARTERIAL", 50, 15);
  
    // Agregar sección de Información del Paciente en columnas
    doc.setFontSize(14);
    doc.text("1. Información del Paciente", 20, 30);
    doc.setFontSize(12);
  
    const infoPacienteData = [
      ["Paciente:", informacionPaciente.paciente],
      ["Fecha de Medición:", formatearFecha(informacionPaciente.fechaMedicion)],
      ["Especie:", informacionPaciente.especie],
      ["Raza:", informacionPaciente.raza],
      ["Color:", informacionPaciente.color],
      ["Sexo:", informacionPaciente.sexo],
      ["Edad:", informacionPaciente.edad],
      ["Tipo de Atención:", informacionPaciente.tipoAtencion],
      ["Tutor:", informacionPaciente.tutor],
    ];
  
    doc.autoTable({
      body: infoPacienteData,
      startY: 40,
      styles: { fontSize: 12 },
      columnStyles: {
        0: { fontStyle: "bold" },
      },
    });
  
    doc.setFontSize(14);
doc.text("2. ANTECEDENTES:", 20, doc.autoTable.previous.finalY + 10);
doc.setFontSize(12);

const splitAntecedentes = doc.splitTextToSize(infoAntecedentes, 170);
const antecedentesHeight = doc.getTextDimensions(splitAntecedentes).h;

const maxHeight = 280 - doc.autoTable.previous.finalY - 10;
if (antecedentesHeight > maxHeight) {
  doc.addPage();
  doc.setFontSize(14);
  doc.text("2. ANTECEDENTES:", 20, 30); // Ajusta la posición en la nueva página
  doc.setFontSize(12);
}

doc.text(splitAntecedentes, 20, doc.autoTable.previous.finalY + 20);

    
  
    // Espacio entre secciones
    const espacioEntreSecciones = 20; // Puedes ajustar el valor según tus necesidades
  
    // Agregar sección de Tabla de Medición
    doc.addPage(); // Agrega una nueva página
    doc.setFontSize(14);
    doc.text("3. TABLA DE MEDICIÓN DE PRESIÓN", 20, espacioEntreSecciones);
    doc.setFontSize(12); // Esto define el tamaño de fuente para el contenido de la tabla
  
    // Calcular el promedio
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
  
    // Iniciar la tabla después del título
    const tableOptions = {
      startY: espacioEntreSecciones + 10,
      margin: { top: 50 },
    };
  
    doc.autoTable({
      tableOptions,
      head: [['Nº', 'PAS', 'PAD', 'PAM', 'FC']],
      body: tableData,
      startY: espacioEntreSecciones + 10, // Iniciar la tabla después del título
    });


  
    doc.text("Promedio:", 20, doc.autoTable.previous.finalY + 10);
    doc.text(`PAS: ${promedioPas}`, 50, doc.autoTable.previous.finalY + 10);
    doc.text(`PAD: ${promedioPad}`, 80, doc.autoTable.previous.finalY + 10);
    doc.text(`PAM: ${promedioPam}`, 110, doc.autoTable.previous.finalY + 10);
    doc.text(`FC: ${promedioFc}`, 140, doc.autoTable.previous.finalY + 10);


    // Agregar sección de Tabla de Medición
    // doc.addPage(); // Agrega una nueva página
    doc.setFontSize(14);
    doc.text("4. GRAFICO PRESIONES", 20,150);
    doc.setFontSize(12); // Esto define el tamaño de fuente para el contenido de la tabla
    // Renderizar el gráfico y convertirlo a imagen
    const canvas = document.querySelector('canvas');
    const chartBase64 = canvas.toDataURL('image/png');

    doc.addImage(chartBase64, 'PNG', 20, 160, 180, 110);



    // Agregar el footer
    const footerText = "Examen de toma de presión a domicilio, realizado con equipo SUNTech30, según las normas establecidas por fabricante y profesional de médico veterinario.";
    const pageHeight = doc.internal.pageSize.height;
    const marginLeft = 20;
    const marginBottom = 5; // Ajusta el margen inferior según necesites
    const lineHeight = 5; // Ajusta el espacio entre líneas según necesites
    
    doc.setFontSize(9);
    const footerLines = doc.splitTextToSize(footerText, 180); // Ajusta el ancho máximo de línea
    
    // Calcula la posición Y inicial
    let yPosition = pageHeight - marginBottom;
    footerLines.reverse().forEach((line) => {
      doc.text(line, marginLeft, yPosition);
      yPosition -= lineHeight;
    });
    
// Crear nombre de archivo personalizado
const pacienteNombre = informacionPaciente.paciente || "PacienteDesconocido";
const fechaMedicion = informacionPaciente.fechaMedicion || new Date().toLocaleDateString();
const nombreArchivo = `InformePA_${pacienteNombre}_${fechaMedicion}.pdf`.replace(/[/\\?%*:|"<>]/g, '_'); // Reemplazar caracteres inválidos en el nombre del archivo

doc.save(nombreArchivo);
    
  };
  

  const calcularPromedio = (columna) => {
    const valores = mediciones.map((medida) => Number(medida[columna]) || 0);
    const promedio =
      valores.reduce((acc, curr) => acc + curr, 0) / valores.length;
    return promedio.toFixed(1);
  };

  return (
    <div>
      <h1>INFORME MEDICIÓN DE PRESIÓN ARTERIAL</h1>
      <InformacionPaciente onGuardarInformacion={handleGuardarInformacion} />
      <Antecedentes onGuardarAntecedente={handleGuardarAntecedentes} />
      <TablaMedicion onGuardarTablaMedicion={handleGuardarTablaMedicion} />
      <ChartComponent data={mediciones} />
      

      <button onClick={generarPDF}>Generar PDF</button>
    </div>
  );
}

export default Formulario;
