import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faQuestionCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const VA = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Predefined questions
  const predefinedQuestions = [
    "What are the visiting hours?",
    "How can I schedule an appointment?",
    "What services does the hospital offer?",
    "What insurance plans are accepted?",
    "How do I access my medical records?",
  ];

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle selection of a predefined question
  const handleQuestionSelect = (question) => {
    setInputText(question);
    setDropdownVisible(false);
  };

  // Handle sending the question to the backend
  const handleSend = async () => {
    if (inputText.trim() === "") return;

    try {
      setLoading(true);
      setChatHistory((prev) => [...prev, { role: "user", content: inputText }]);

      const response = await axios.post(
        "http://localhost:5001/chatbot",
        { message: inputText },
        { headers: { "Content-Type": "application/json" } }
      );

      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: response.data.reply },
      ]);

      setInputText("");
    } catch (error) {
      console.error("Error communicating with the assistant:", error);
      alert("Failed to communicate with the assistant. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Clear the input and chat history
  const handleClear = () => {
    setInputText("");
    setChatHistory([]);
  };

  // Handle voice input (placeholder function)
  const handleVoiceInput = () => {
    // Implement voice input functionality here
    console.log("Voice input feature is not yet implemented.");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Virtual Assistant</h2>

      {/* Input area */}
      <textarea
        className="w-full h-40 border rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your question or select from the options..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={loading}
      />

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
            {loading ? "Loading..." : "Ask Question"}
          </button>
          {/* Dropdown menu */}
          {dropdownVisible && (
            <ul className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {predefinedQuestions.map((question, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleQuestionSelect(question)}
                >
                  {question}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleSend}
          className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
          {loading ? "Sending..." : "Send"}
        </button>

        <button
          onClick={handleVoiceInput}
          className="flex items-center bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
          Voice Input
        </button>

        <button
          onClick={handleClear}
          className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Clear
        </button>
      </div>

      {/* Chat history */}
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
