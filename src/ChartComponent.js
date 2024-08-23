// ChartComponent.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const ChartComponent = ({ data }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Si ya hay un gráfico, destrúyelo antes de crear uno nuevo
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Crear el gráfico
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, index) => `Medición ${index + 1}`),
        datasets: [
          { label: 'PAS', data: data.map(item => item.pas), borderColor: 'green', fill: false },
          { label: 'PAD', data: data.map(item => item.pad), borderColor: 'orange', fill: false },
          { label: 'PAM', data: data.map(item => item.pam), borderColor: 'red', fill: false },
          { label: 'FC', data: data.map(item => item.fc), borderColor: 'yellow', fill: false },
        ],
      },
      options: {
        scales: {
          x: { title: { display: true, text: 'Mediciones' } },
          y: { title: { display: true, text: 'mmHg/ms' } },
        },
      },
    });

    // Limpia el gráfico cuando el componente se desmonte
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]); // Dependencia en 'data' para actualizar el gráfico cuando cambien los datos

  return <canvas ref={canvasRef} width="400" height="200" />;
};

export default ChartComponent;
