document.getElementById("schedule-form").onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        patient_data: [1, 2, 3]  // Example patient data; replace with form values as needed
    };
    const response = await fetch("http://127.0.0.1:5000/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    alert(`Predicted Duration: ${result.predicted_duration}`);
};

document.getElementById("resource-form").onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        resource_data: [4, 5, 6]  // Example resource data; replace with form values as needed
    };
    const response = await fetch("http://127.0.0.1:5000/allocate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    alert(`Predicted Allocation: ${result.predicted_allocation}`);
};
