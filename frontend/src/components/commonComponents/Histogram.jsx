import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components of Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Histogram = ({ data }) => {

  if (!Array.isArray(data.values) || data.values.some(val => typeof val !== 'number')) {
    console.error("Invalid values array:", data.values);
  }
  
  const chartData = {
    labels: data.labels, // X-axis labels
    datasets: [
      {
        label: 'Frequency',
        data: data.values, // Y-axis values
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar color
        borderColor: 'rgba(75, 192, 192, 1)', // Border color
        borderWidth: 1, // Border width
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };
  

  return <Bar data={chartData} options={options} />;
};

export default Histogram;
