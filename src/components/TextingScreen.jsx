import React, { useState, useEffect } from "react";
import Message from "./Message";
import Config from "./Config";
import backendUrl from "./Config";

function TextingScreen(props) {
  // Define states
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [userProfileIcon, setUserProfileIcon] = useState(null);

  const greetings = [
    "Hey there, how's your day going?",
    "Hi, how are you feeling today?",
    "Hello! How's everything on your end?",
    "Greetings! How's your day treating you?",
    "Hey, how are you doing today?",
    "Hi there! How are things in your world?",
    "Hello! How's your day shaping up?",
    "Hey, how's your day looking so far?",
    "Hi! How's the world treating you today?",
    "Hello there, how's your day unfolding?",
  ];

  useEffect(() => {
    const greetingUsed =
      greetings[Math.floor(Math.random() * greetings.length)];
    setMessages([{ message: greetingUsed, texter: false, name: "John" }]);
  }, []);

  // Define functions

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(inputValue);
  };

  // Handler for send button click
  const handleSendClick = async () => {
    if (inputValue) {
      const newMessage = {
        message: inputValue,
        texter: true,
        name: "anonym",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue("");

      try {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        };

        // Send POST request
        const response = await fetch(
          `${backendUrl}/chat-therapist`,
          requestOptions,
        );

        if (response.ok) {
          // Process the response here
          const responseData = await response.text();
          console.log("Received response:", responseData);
          setMessages((prevMessages) => [
            ...prevMessages,
            { message: responseData, texter: false, name: "John" },
          ]);
        } else {
          console.error(
            "Request failed:",
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    }
  };

  // true = user, false = bot
  return (
    <>
      <div className="textingScreen">
        <div className="textingHeadingContainer">
          <img
            className="textingProfileIcon"
            src={require(`../IMG/${props.name.toLowerCase()}Logo.png`)}
            alt="John's profile picture"
          />
          <h1 className="title chatTitle">{props.name}</h1>
        </div>
        <div className="conversation">
          {messages.map((msg, index) => (
            <Message
              key={index}
              message={msg.message}
              texter={msg.texter}
              name={msg.name}
            />
          ))}
        </div>
        <div className="form">
          <input
            className="textingInput"
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="primaryButton"
            onClick={handleSendClick}
          >
            send
          </button>
        </div>
      </div>
      <button
        type="button"
        className="secondaryButton backButton"
        onClick={props.handleBackClick}
      >
        back
      </button>
    </>
  );
}

export default TextingScreen;
