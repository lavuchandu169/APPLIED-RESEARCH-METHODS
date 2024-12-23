import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faUserCheck, faTools } from "@fortawesome/free-solid-svg-icons";

// Registering necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Results = ({ inputData }) => {
  const [predictedValues, setPredictedValues] = useState(null);
  const [loading, setLoading] = useState(false); // Initial state set to false
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      if (!inputData) return; // Guard clause if no inputData is provided

      setLoading(true);
      setError(null);

      try {
        // API call to fetch predictions
        const response = await axios.post("http://127.0.0.1:5001/predict/combined", inputData);
        setPredictedValues(response.data); // Store predictions
      } catch (err) {
        console.error("Error fetching predictions:", err);
        setError("Failed to fetch predictions from the backend.");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [inputData]);

  // Handle loading state
  if (loading) return <p className="text-center">Loading recommendations...</p>;

  // Handle error state
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  // Render nothing if no predictions available
  if (!predictedValues) return null;

  const enteredValues = inputData;

  // Chart.js data configuration
  const data = {
    labels: ["Entered Value", "Predicted Value"],
    datasets: [
      {
        label: "Bed Allocation",
        data: [enteredValues.beds, predictedValues.bed_allocation],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Staff Optimization",
        data: [enteredValues.staff, predictedValues.staff_optimization],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Equipment Utilization",
        data: [enteredValues.equipment, predictedValues.equipment_utilization],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart.js options configuration
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Performance Metrics",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Values",
        },
        barPercentage: 0.5,
      },
      y: {
        title: {
          display: true,
          text: "Count",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Results Overview</h2>

      {/* Display input and prediction values */}
      <div className="mb-6 text-center">
        <p className="text-lg font-semibold">
          <FontAwesomeIcon icon={faBed} className="mr-2" />
          Bed Allocation: Entered Value - {enteredValues.beds}, Predicted Value -{" "}
          {predictedValues.bed_allocation}
        </p>
        <p className="text-lg font-semibold">
          <FontAwesomeIcon icon={faUserCheck} className="mr-2" />
          Staff Optimization: Entered Value - {enteredValues.staff}, Predicted Value -{" "}
          {predictedValues.staff_optimization}
        </p>
        <p className="text-lg font-semibold">
          <FontAwesomeIcon icon={faTools} className="mr-2" />
          Equipment Utilization: Entered Value - {enteredValues.equipment}, Predicted Value -{" "}
          {predictedValues.equipment_utilization}
        </p>
      </div>

      {/* Render bar charts */}
      <div className="flex justify-between">
        <div className="flex flex-col items-center w-1/3 mx-2">
          <h3 className="text-xl font-semibold mb-2">
            <FontAwesomeIcon icon={faBed} className="mr-1" />
            Bed Allocation
          </h3>
          <div style={{ height: "300px" }}>
            <Bar
              data={{ labels: ["Entered Value", "Predicted Value"], datasets: [{ ...data.datasets[0] }] }}
              options={options}
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3 mx-2">
          <h3 className="text-xl font-semibold mb-2">
            <FontAwesomeIcon icon={faUserCheck} className="mr-1" />
            Staff Optimization
          </h3>
          <div style={{ height: "300px" }}>
            <Bar
              data={{ labels: ["Entered Value", "Predicted Value"], datasets: [{ ...data.datasets[1] }] }}
              options={options}
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3 mx-2">
          <h3 className="text-xl font-semibold mb-2">
            <FontAwesomeIcon icon={faTools} className="mr-1" />
            Equipment Utilization
          </h3>
          <div style={{ height: "300px" }}>
            <Bar
              data={{ labels: ["Entered Value", "Predicted Value"], datasets: [{ ...data.datasets[2] }] }}
              options={options}
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold">Integrated Recommendation Values:</h3>
        <ul className="list-disc list-inside">
          <li>Recommended Bed Allocation Increase by {predictedValues.bed_allocation - enteredValues.beds}%</li>
          <li>Staff Optimization Target at {predictedValues.staff_optimization - enteredValues.staff}%</li>
          <li>Equipment Utilization Target at {predictedValues.equipment_utilization - enteredValues.equipment}%</li>
        </ul>
      </div>
    </div>
  );
};

export default Results;
