import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faTrash,
  faArrowLeft,
  faComments,
  faHospital,
  faBriefcase,
  faClipboard,
} from "@fortawesome/free-solid-svg-icons";

const VA = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const chatContainerRef = useRef(null);

  // Categorized predefined questions and answers
  const categorizedQA = {
    General: [
      {
        question: "What are the visiting hours?",
        answer: "Visiting hours are from 9 AM to 8 PM daily.",
      },
      {
        question: "What insurance plans are accepted?",
        answer:
          "We accept various insurance plans. Please contact our billing department for a comprehensive list.",
      },
      {
        question: "Is there parking available for visitors?",
        answer:
          "Yes, we have a visitor parking lot located adjacent to the main entrance. Parking fees may apply.",
      },
    ],
    Services: [
      {
        question: "What services does the hospital offer?",
        answer:
          "Our hospital offers a wide range of services including emergency care, surgery, maternity, and outpatient services.",
      },
      {
        question:
          "Are interpreters available for non-English speaking patients?",
        answer:
          "Yes, interpreter services are available upon request to assist non-English speaking patients.",
      },
      {
        question: "Are there any support groups available?",
        answer:
          "Yes, we offer various support groups for patients and families. Please visit our website or contact our social services department for more information.",
      },
    ],
    Policies: [
      {
        question: "What should I bring for my hospital stay?",
        answer:
          "Please bring personal identification, insurance information, a list of current medications, and any personal items for comfort.",
      },
      {
        question: "What items are prohibited during my hospital stay?",
        answer:
          "Prohibited items include personal electrical appliances, weapons, and any substances not prescribed by your physician.",
      },
      {
        question: "Can I have someone stay overnight with me?",
        answer:
          "Overnight stays by family members are permitted in certain departments. Please check with the nursing staff for specific policies.",
      },
    ],
  };

  // Scroll to the bottom of chat when chatHistory or dropdown visibility changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, dropdownVisible]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
    setCurrentCategory(null); // Reset category selection when dropdown is toggled
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setCurrentCategory(category);
  };

  // Handle question selection
  const handleQuestionSelect = (qa) => {
    setChatHistory((prev) => [
      ...prev,
      { role: "user", content: qa.question },
      { role: "assistant", content: qa.answer },
    ]);
    setDropdownVisible(false); // Close dropdown after selection
  };

  // Clear the chat history
  const handleClear = () => {
    setChatHistory([]);
  };

  const categoryIcons = {
    General: faHospital,
    Services: faBriefcase,
    Policies: faClipboard,
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Virtual Assistant</h2>

      {/* Chat Area */}
      <div
        ref={chatContainerRef}
        className="mt-6 p-4 bg-gray-100 rounded-lg h-96 overflow-y-auto relative"
      >
        {chatHistory.length === 0 && !dropdownVisible ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <FontAwesomeIcon icon={faComments} className="text-4xl mb-2" />
            <p>Start a conversation by asking a question.</p>
          </div>
        ) : null}

        {chatHistory.map((entry, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg max-w-[75%] ${
              entry.role === "user"
                ? "bg-blue-200 text-blue-800 self-end ml-auto"
                : "bg-green-200 text-green-800 self-start"
            }`}
          >
            <strong>{entry.role === "user" ? "You" : "Assistant"}: </strong>
            {entry.content}
          </div>
        ))}

        {/* Dropdown for categories/questions */}
        {dropdownVisible && (
          <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-md">
            {currentCategory ? (
              <>
                <button
                  className="mb-4 flex items-center text-blue-500 hover:underline"
                  onClick={() => setCurrentCategory(null)}
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                  to Categories
                </button>
                <ul>
                  {categorizedQA[currentCategory].map((qa, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleQuestionSelect(qa)}
                    >
                      {qa.question}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul>
                {Object.keys(categorizedQA).map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategorySelect(category)}
                  >
                    <FontAwesomeIcon
                      icon={categoryIcons[category]}
                      className="mr-2 text-blue-500"
                    />
                    {category}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={toggleDropdown}
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
          Ask a Question
        </button>

        <button
          onClick={handleClear}
          className="flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <FontAwesomeIcon icon={faTrash} className="mr-2" />
          Clear
        </button>
      </div>
    </div>
  );
};

export default VA;
