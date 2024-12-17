import React, { useState } from "react";
import {
  fetchBedAllocation,
  fetchStaffOptimization,
  fetchEquipmentUtilization,
  fetchCombinedPrediction,
} from "../utils/api";

function MultiModelForm({ onResults }) {
  const [formData, setFormData] = useState({
    patient_load: 50,
    staff_available: 20,
    equipment_in_use: 30,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to manage errors

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error state

    try {
      console.log("Sending data to backend:", formData);

      // Simultaneous API calls
      const [bedResponse, staffResponse, equipmentResponse, combinedResponse] = await Promise.all([
        fetchBedAllocation(formData),
        fetchStaffOptimization(formData),
        fetchEquipmentUtilization(formData),
        fetchCombinedPrediction(formData),
      ]);

      console.log("API Responses:", {
        bedAllocation: bedResponse,
        staffOptimization: staffResponse,
        equipmentUtilization: equipmentResponse,
        combined: combinedResponse,
      });

      // Update results to parent component
      onResults({
        bedAllocation: bedResponse.prediction,
        staffOptimization: staffResponse.prediction,
        equipmentUtilization: equipmentResponse.prediction,
        combined: combinedResponse.recommendation,
      });
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h3>Enter Input Data</h3>
      <label>
        Patient Load:
        <input
          type="number"
          name="patient_load"
          value={formData.patient_load}
          onChange={handleChange}
          min="0"
          required
        />
      </label>

      <label>
        Staff Available:
        <input
          type="number"
          name="staff_available"
          value={formData.staff_available}
          onChange={handleChange}
          min="0"
          required
        />
      </label>

      <label>
        Equipment In Use:
        <input
          type="number"
          name="equipment_in_use"
          value={formData.equipment_in_use}
          onChange={handleChange}
          min="0"
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Get Recommendations"}
      </button>

      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default MultiModelForm;
