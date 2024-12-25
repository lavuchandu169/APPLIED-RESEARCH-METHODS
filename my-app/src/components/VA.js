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

  // Predefined questions and answers
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
    {
      question: "What should I bring for my hospital stay?",
      answer: "Please bring personal identification, insurance information, a list of current medications, and any personal items for comfort.",
    },
    {
      question: "Are interpreters available for non-English speaking patients?",
      answer: "Yes, interpreter services are available upon request to assist non-English speaking patients.",
    },
    {
      question: "How can I provide feedback about my care?",
      answer: "We value your feedback. You can provide it through our online survey or by contacting our patient relations department.",
    },
    {
      question: "Is there parking available for visitors?",
      answer: "Yes, we have a visitor parking lot located adjacent to the main entrance. Parking fees may apply.",
    },
    {
      question: "What are the cafeteria hours?",
      answer: "Our cafeteria is open from 7 AM to 7 PM, offering a variety of meal options for patients and visitors.",
    },
    {
      question: "Can I have someone stay overnight with me?",
      answer: "Overnight stays by family members are permitted in certain departments. Please check with the nursing staff for specific policies.",
    },
    {
      question: "What items are prohibited during my hospital stay?",
      answer: "Prohibited items include personal electrical appliances, weapons, and any substances not prescribed by your physician.",
    },
    {
      question: "How do I request a copy of my billing statement?",
      answer: "You can request a copy of your billing statement by contacting our billing department or through our patient portal.",
    },
    {
      question: "Are there any support groups available?",
      answer: "Yes, we offer various support groups for patients and families. Please visit our website or contact our social services department for more information.",
    },
    {
      question: "What should I do if I have concerns about my care?",
      answer: "If you have any concerns, please speak with your nurse or physician immediately, or contact our patient advocacy team.",
    },
  
    // Add more predefined questions and answers as needed
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
          onClick={() => {
            // Implement send functionality here
          }}
          className="flex items-center bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
          Send
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
