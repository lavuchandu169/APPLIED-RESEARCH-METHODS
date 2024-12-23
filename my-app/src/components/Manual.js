import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserCheck, faTools } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Manual = () => {
  const [patientsLoad, setPatientsLoad] = useState("");
  const [staffAvailable, setStaffAvailable] = useState("");
  const [equipmentsInUse, setEquipmentsInUse] = useState("");
  const [errors, setErrors] = useState({});
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef(null); // Reference for the results section

  const validateInputs = () => {
    const validationErrors = {};

    if (!patientsLoad) {
      validationErrors.patientsLoad = "Patients Load is required";
    } else if (isNaN(patientsLoad) || patientsLoad < 0) {
      validationErrors.patientsLoad = "Please enter a valid positive number";
    }

    if (!staffAvailable) {
      validationErrors.staffAvailable = "Staff Available is required";
    } else if (isNaN(staffAvailable) || staffAvailable < 0) {
      validationErrors.staffAvailable = "Please enter a valid positive number";
    }

    if (!equipmentsInUse) {
      validationErrors.equipmentsInUse = "Equipments in Use is required";
    } else if (isNaN(equipmentsInUse) || equipmentsInUse < 0) {
      validationErrors.equipmentsInUse = "Please enter a valid positive number";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        setRecommendations(null); // Clear previous recommendations

        // Make API call to backend
        const response = await axios.post("http://localhost:5001/predict/combined", {
          patient_load: parseFloat(patientsLoad),
          staff_available: parseFloat(staffAvailable),
          equipment_in_use: parseFloat(equipmentsInUse),
        });

        setRecommendations(response.data); // Store recommendations

        // Scroll to results section after data is fetched
        setTimeout(() => {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        alert("Failed to fetch recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Get Recommendations</h2>
      <form onSubmit={handleSubmit}>
        {/* Patients Load Input */}
        <div className="mb-4">
          <label htmlFor="patientsLoad" className="block text-gray-700 font-medium mb-2">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Patients Load
          </label>
          <input
            type="number"
            id="patientsLoad"
            value={patientsLoad}
            onChange={(e) => setPatientsLoad(e.target.value)}
            className={`border rounded w-full py-2 px-3 text-gray-700 ${
              errors.patientsLoad ? "border-red-500" : ""
            }`}
            placeholder="Enter number of patients"
            min="0"
          />
          {errors.patientsLoad && <p className="text-red-500 text-xs mt-1">{errors.patientsLoad}</p>}
        </div>

        {/* Staff Available Input */}
        <div className="mb-4">
          <label htmlFor="staffAvailable" className="block text-gray-700 font-medium mb-2">
            <FontAwesomeIcon icon={faUserCheck} className="mr-2" />
            Staff Available
          </label>
          <input
            type="number"
            id="staffAvailable"
            value={staffAvailable}
            onChange={(e) => setStaffAvailable(e.target.value)}
            className={`border rounded w-full py-2 px-3 text-gray-700 ${
              errors.staffAvailable ? "border-red-500" : ""
            }`}
            placeholder="Enter number of staff"
            min="0"
          />
          {errors.staffAvailable && (
            <p className="text-red-500 text-xs mt-1">{errors.staffAvailable}</p>
          )}
        </div>

        {/* Equipments In Use Input */}
        <div className="mb-4">
          <label htmlFor="equipmentsInUse" className="block text-gray-700 font-medium mb-2">
            <FontAwesomeIcon icon={faTools} className="mr-2" />
            Equipments in Use
          </label>
          <input
            type="number"
            id="equipmentsInUse"
            value={equipmentsInUse}
            onChange={(e) => setEquipmentsInUse(e.target.value)}
            className={`border rounded w-full py-2 px-3 text-gray-700 ${
              errors.equipmentsInUse ? "border-red-500" : ""
            }`}
            placeholder="Enter number of equipments"
            min="0"
          />
          {errors.equipmentsInUse && (
            <p className="text-red-500 text-xs mt-1">{errors.equipmentsInUse}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>

      {/* Link to Results */}
      {recommendations && (
        <div className="text-center mt-4">
          <a
            href="#results-section"
            className="text-blue-500 underline"
            onClick={(e) => {
              e.preventDefault();
              resultsRef.current.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Results
          </a>
        </div>
      )}

      {/* Display Recommendations */}
      {recommendations && (
        <div ref={resultsRef} id="results-section" className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
          <p>Beds: {recommendations.bed_allocation}</p>
          <p>Staff: {recommendations.staff_optimization}</p>
          <p>Equipment: {recommendations.equipment_utilization}</p>
          <p>{recommendations.recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default Manual;
