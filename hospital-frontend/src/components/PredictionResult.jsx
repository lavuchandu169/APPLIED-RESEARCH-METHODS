import React from "react";
import { Bar } from "react-chartjs-2";

function PredictionResult({ results }) {
  if (!results) return null;

  const chartData = {
    labels: ["Bed Allocation", "Staff Optimization", "Equipment Utilization"],
    datasets: [
      {
        label: "Individual Predictions",
        data: [results.bedAllocation, results.staffOptimization, results.equipmentUtilization],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Prediction Results</h2>
      <p><strong>Bed Allocation:</strong> {results.bedAllocation}</p>
      <p><strong>Staff Optimization:</strong> {results.staffOptimization}</p>
      <p><strong>Equipment Utilization:</strong> {results.equipmentUtilization}</p>
      <p><strong>Integrated Recommendation:</strong> {results.combined}</p>
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
}

export default PredictionResult;
