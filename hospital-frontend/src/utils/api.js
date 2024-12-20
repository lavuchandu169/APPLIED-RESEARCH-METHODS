import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/predict";

// Define the fetch functions
export const fetchBedAllocation = async(data) => {
    return axios.post(`${BASE_URL}/bed_allocation`, data);
};

export const fetchStaffOptimization = async(data) => {
    return axios.post(`${BASE_URL}/staff_optimization`, data);
};

export const fetchEquipmentUtilization = async(data) => {
    return axios.post(`${BASE_URL}/equipment_utilization`, data);
};

export const fetchCombinedPrediction = async(data) => {
    return axios.post(`${BASE_URL}/combined`, data);
};

export const fetchChatResponse = async(message) => {
    const response = await axios.post(`${BASE_URL}/chat`, { message });
    return response.data;
};
