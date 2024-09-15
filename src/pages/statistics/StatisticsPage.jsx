import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useUserStore } from '../../context/useUserStore';
import styles from './statistics.module.css';
import countryOptions from '../../data/countries.json';

ChartJS.register(ArcElement, Tooltip, Legend);

function StatisticsPage() {
  const users = useUserStore((state) => state.users);

  const countryData = countryOptions.reduce((acc, country) => {
    acc[country] = 0;
    return acc;
  }, {});

  Object.values(users).forEach(user => {
    if (countryData.hasOwnProperty(user.country)) {
      countryData[user.country]++;
    }
  });

  const colorPalette = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#45B39D', '#F39C12',
    '#E74C3C', '#3498DB', '#2ECC71', '#F1C40F', '#9B59B6', '#1ABC9C', '#34495E', '#D35400',
    '#7F8C8D', '#27AE60', '#E67E22', '#8E44AD', '#16A085', '#2980B9', '#C0392B', '#BDC3C7'
  ];

  const data = {
    labels: Object.keys(countryData),
    datasets: [
      {
        data: Object.values(countryData),
        backgroundColor: colorPalette,
        hoverBackgroundColor: colorPalette.map(color => {
          // Create a slightly darker version of each color for hover effect
          const darkenColor = (col) => {
            const amt = -20;
            const num = parseInt(col.slice(1), 16);
            const r = Math.max(0, (num >> 16) + amt);
            const g = Math.max(0, ((num >> 8) & 0x00FF) + amt);
            const b = Math.max(0, (num & 0x0000FF) + amt);
            return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
          };
          return darkenColor(color);
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className={styles.pageRoot}>
      <div className={styles.chartContainer}>
        <h2>User Distribution by Country</h2>
        <div className={styles.pieChartWrapper}>
          <Pie data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default StatisticsPage;
