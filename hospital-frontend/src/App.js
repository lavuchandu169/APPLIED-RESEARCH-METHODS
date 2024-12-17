import React, { useState } from "react";
import MultiModelForm from "./components/MultiModelForm";
import PredictionResult from "./components/PredictionResult";
import VirtualAssistant from "./components/VirtualAssistant";
import "./styles.css";

function App() {
    const [manualResults, setManualResults] = useState(null); // State for manual form results
    const [assistantResults, setAssistantResults] = useState(null); // State for Virtual Assistant results
    const [combinedResults, setCombinedResults] = useState(null); // Combined results

    // Function to update results dynamically
    const handleResultsUpdate = (type, results) => {
        if (type === "manual") {
            setManualResults(results);
        } else if (type === "assistant") {
            setAssistantResults(results);
        }

        // Merge all results into combinedResults
        setCombinedResults({
            ...(manualResults || {}),
            ...(assistantResults || {}),
            ...results,
        });
    };

    return ( <
        div className = "app-container" >
        <
        h1 > Hospital Resource Allocation System < /h1>

        { /* Section for Manual Input */ } <
        div className = "manual-input" >
        <
        h2 > Manual Input < /h2> <
        MultiModelForm onResults = {
            (results) => handleResultsUpdate("manual", results) }
        /> <
        /div>

        { /* Section for Virtual Assistant */ } <
        div className = "virtual-assistant" >
        <
        h2 > Virtual Assistant < /h2> <
        VirtualAssistant onResults = {
            (results) => handleResultsUpdate("assistant", results) }
        /> <
        /div>

        { /* Results Display */ } <
        div className = "results-section" >
        <
        h2 > Results < /h2> {
            combinedResults ? ( <
                PredictionResult results = { combinedResults }
                />
            ) : ( <
                p > No results to display yet.Submit the form or use the Virtual Assistant. < /p>
            )
        } <
        /div> <
        /div>
    );
}

export default App;