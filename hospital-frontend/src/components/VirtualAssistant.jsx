import React, { useState } from "react";
import axios from "axios";
import "./VirtualAssistant.css"; // Add styling for chat-style UI

function VirtualAssistant({ onResults }) {
  const [userMessage, setUserMessage] = useState("");
  const [assistantResponse, setAssistantResponse] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [conversation, setConversation] = useState([]); // Store conversation history

  // Submit text or voice input
  const handleSubmit = async (message = userMessage) => {
    if (!message.trim()) return; // Prevent empty submissions
    setLoading(true);

    try {
      // Add user message to conversation
      setConversation((prev) => [...prev, { sender: "user", text: message }]);

      const response = await axios.post("http://localhost:5000/chat", {
        message: message,
      });
      const reply = response.data.reply;

      // Update assistant response
      setAssistantResponse(reply);
      speakResponse(reply); // Voice output

      // Add assistant response to conversation
      setConversation((prev) => [...prev, { sender: "assistant", text: reply }]);

      onResults({ recommendation: reply }); // Send response to parent component
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = "Sorry, I couldn't process your request.";
      setAssistantResponse(errorMessage);
      speakResponse(errorMessage);

      setConversation((prev) => [...prev, { sender: "assistant", text: errorMessage }]);
    } finally {
      setLoading(false);
      setUserMessage(""); // Reset input field
    }
  };

  // Voice input handling
  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserMessage(transcript);
      handleSubmit(transcript); // Auto-submit voice input
    };
    recognition.start();
  };

  // Voice output for assistant's response
  const speakResponse = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  // Clear the conversation history
  const clearConversation = () => {
    setUserMessage("");
    setAssistantResponse("");
    setConversation([]);
  };

  return (
    <div className="virtual-assistant-container">
      <h3>ChatGPT Assistant</h3>

      {/* Chat UI */}
      <div className="chat-box">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user" : "assistant"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <p className="loading">Loading...</p>}
      </div>

      {/* Input Section */}
      <div className="input-section">
        <input
          type="text"
          placeholder="Ask a question..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()} // Submit on Enter key
        />
        <button onClick={() => handleSubmit()}>Send</button>
        <button onClick={startListening}>🎙 Speak</button>
        <button onClick={clearConversation}>🗑 Clear</button>
      </div>
    </div>
  );
}

export default VirtualAssistant;
