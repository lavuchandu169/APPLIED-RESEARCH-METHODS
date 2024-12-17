import axios from "axios";

// Set your Flask backend URL here
const API_BASE_URL = "http://127.0.0.1:5000";

// API calls
export const fetchBedAllocation = async(inputData) => {
    const response = await axios.post(`${API_BASE_URL}/predict/bed_allocation`, inputData);
    return response.data;
};

export const fetchStaffOptimization = async(inputData) => {
    const response = await axios.post(`${API_BASE_URL}/predict/staff_optimization`, inputData);
    return response.data;
};

export const fetchEquipmentUtilization = async(inputData) => {
    const response = await axios.post(`${API_BASE_URL}/predict/equipment_utilization`, inputData);
    return response.data;
};

export const fetchCombinedRecommendation = async(inputData) => {
    const response = await axios.post(`${API_BASE_URL}/predict/combined`, inputData);
    return response.data;
};

export const fetchChatResponse = async(message) => {
    const response = await axios.post(`${API_BASE_URL}/chat`, { message });
    return response.data;
};