import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faQuestionCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios"; // Import Axios for API calls

const VA = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // To maintain chat history
  const [loading, setLoading] = useState(false); // Loading state for API calls

  // Handle the Ask Question functionality
  const handleAskQuestion = async () => {
    if (inputText.trim() === "") return; // Do nothing if input is empty

    try {
      setLoading(true); // Set loading to true while processing

      // Add user input to chat history
      setChatHistory((prev) => [...prev, { role: "user", content: inputText }]);

      // Send the input to the backend
      const response = await axios.post("http://localhost:5001/chatbot", {
        message: inputText,
      });

      // Add assistant's reply to chat history
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply },
      ]);

      setInputText(""); // Clear input text
    } catch (error) {
      console.error("Error communicating with the assistant:", error);
      alert("Failed to communicate with the assistant. Please try again later.");
    } finally {
      setLoading(false); // Set loading back to false
    }
  };

  // Send button functionality
  const handleSend = () => {
    handleAskQuestion();
  };

  // Speak functionality using browser's speech synthesis
  const handleSpeak = () => {
    if (inputText.trim() === "") return;
    const utterance = new SpeechSynthesisUtterance(inputText);
    window.speechSynthesis.speak(utterance);
  };

  // Clear the input and chat history
  const handleClear = () => {
    setInputText("");
    setChatHistory([]);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Virtual Assistant</h2>

      {/* Input area */}
      <textarea
        className="w-full h-40 border rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your question or message here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={loading} // Disable input while loading
      />

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleAskQuestion}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading} // Disable button while loading
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          {loading ? "Asking..." : "Ask Question"}
        </button>

        <button
          onClick={handleSend}
          className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading} // Disable button while loading
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
          {loading ? "Sending..." : "Send"}
        </button>

        <button
          onClick={handleSpeak}
          className="flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
          Speak
        </button>

        <button
          onClick={handleClear}
          className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Clear
        </button>
      </div>

      {/* Chat history display */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg max-h-60 overflow-y-auto">
        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              entry.role === "user"
                ? "bg-blue-200 text-blue-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            <strong>{entry.role === "user" ? "You" : "Assistant"}: </strong>
            {entry.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VA;
