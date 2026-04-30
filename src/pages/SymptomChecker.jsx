import React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { symptomMap } from "../data/symptoms";

export default function SymptomChecker() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there, I am MedBot. Tell me your symptoms." }
  ]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");

    setTimeout(() => {
      const symptom = input.toLowerCase();
      const specialist = symptomMap[symptom];

      if (specialist) {
        localStorage.setItem("specialist", specialist);
        setMessages([
          ...updatedMessages,
          {
            sender: "bot",
            text: `Based on your symptoms, you should consult a ${specialist}.`
          },
          {
            sender: "bot",
            text: "Click below to find the best doctors within your budget "
          }
        ]);
      } else {
        setMessages([
          ...updatedMessages,
          {
            sender: "bot",
            text: "Sorry , I couldn't identify the disease. Try simple words like fever, cough, headache."
          }
        ]);
      }
    }, 800);
  }

  return (
    <div className="container">
      <h2>🤖 MedBot – Symptom Checker</h2>

      <div className="card" style={{ height: "400px", overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: "10px"
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: "15px",
                background:
                  msg.sender === "user" ? "#38bdf8" : "#1e293b",
                color: msg.sender === "user" ? "black" : "white",
                maxWidth: "70%"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="card">
        <input
          placeholder="Type your symptom..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>

        <button
          style={{ marginTop: "10px" }}
          onClick={() => navigate("/budget")}
        >
          Find Best Doctors 
        </button>
      </div>
    </div>
  );
}
