import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AnalyticsChart = ({ totalExpenses, totalBudgetLimit, totalSpent, totalRemaining }) => {
  // 🥧 Data for Pie Chart
  const pieData = {
    labels: ["Expenses", "Remaining Budget"],
    datasets: [
      {
        data: [totalExpenses, totalRemaining],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  // 📊 Data for Bar Chart
  const barData = {
    labels: ["Total Budget", "Spent", "Remaining"],
    datasets: [
      {
        label: "Amount",
        data: [totalBudgetLimit, totalSpent, totalRemaining],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"],
      },
    ],
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-5 bg-gray-800 px-4 py-3 rounded-xl text-white">
      <div className="text-center sm:w-2/4 sm:px-3">
        <h2 className="font-bold text-xl mb-2">Budget Distribution</h2>
        <Doughnut data={pieData} />
      </div>
      <div className="text-center sm:w-2/4 sm:px-3">
        <h2 className="font-bold text-xl mb-2">Budget Breakdown</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default AnalyticsChart;
