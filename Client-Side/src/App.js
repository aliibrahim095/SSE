import React, { useState, useEffect } from "react";
import "./App.css";

const App = (props) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/subscribe");
    eventSource.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => prev.concat(data.message));
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
  };
  return (
    <>
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div>
            <input
            
              type="text"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <input type="submit" />
          </div>
        </form>
      </div>
      <div>
        {messages.map((item) => {
          return <h3>{item}</h3>;
        })}
      </div>
    </>
  );
};

export default App;
