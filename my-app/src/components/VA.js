import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faQuestionCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const VA = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Predefined questions and their corresponding answers
  const predefinedQA = [
    {
      question: "What are the visiting hours?",
      answer: "Visiting hours are from 9 AM to 8 PM daily.",
    },
    {
      question: "How can I schedule an appointment?",
      answer: "You can schedule an appointment by calling our reception at (123) 456-7890 or through our website's appointment portal.",
    },
    {
      question: "What services does the hospital offer?",
      answer: "Our hospital offers a wide range of services including emergency care, surgery, maternity, and outpatient services.",
    },
    {
      question: "What insurance plans are accepted?",
      answer: "We accept various insurance plans. Please contact our billing department for a comprehensive list.",
    },
    {
      question: "How do I access my medical records?",
      answer: "You can access your medical records through our patient portal online or by visiting the medical records department.",
    },
  ];

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Handle selection of a predefined question
  const handleQuestionSelect = (qa) => {
    setInputText(qa.question);
    setDropdownVisible(false);
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: qa.question },
      { role: "assistant", content: qa.answer },
    ]);
    setInputText("");
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
        placeholder="Select a question from the options..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled
      />

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
            Ask Question
          </button>
          {/* Dropdown menu */}
          {dropdownVisible && (
            <ul className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {predefinedQA.map((qa, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleQuestionSelect(qa)}
                >
                  {qa.question}
                </li>
              ))}
            </ul>
          )}
        </div>

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
