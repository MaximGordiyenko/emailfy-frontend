import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './styles.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          '#FF6384', // Colors for each segment
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ].slice(0, Object.keys(data).length), // Dynamically slice colors based on the number of reasons
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'].slice(
          0,
          Object.keys(data).length,
        ),
        borderWidth: 0, // Adding a border between segments (makes the hole visible)
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'right', // Position of the legend (can also be 'bottom', 'left', or 'right')
        labels: {
          font: {
            size: 15, // Increase legend text size
          },
          // Arrange the legend items in a row
          boxWidth: 20, // Width of the color box next to the legend text
          padding: 15, // Space between legend items
        },
        // To ensure that the legend items are laid out horizontally
        onClick: null,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data?.reduce((a, b) => a + b, 0);
            const value = context.parsed;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="doughnut-chart-container">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
