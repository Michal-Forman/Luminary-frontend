import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TextingScreen from "../components/TextingScreen";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function ChatTherapist() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);

  const [chatting, setChatting] = useState(false);
  const [userProfileIcon, setUserProfileIcon] = useState(null);

  const handleChatButtonClick = () => {
    setChatting(true);
  };

  const handleBackClick = () => {
    setChatting(false);
  };

  return (
    <>
      <Navbar />
      <div className="titleContainer">
        <h1 className="title">Personal Therapist</h1>
      </div>
      <div className="therapistBioContainer">
        <div className="therapistBio">
          <div className="therapistMainContainer">
            <img
              className="johnProfileIcon"
              src={require("../IMG/johnLogo.png")}
            />
            <h2 className="title">John Miller</h2>
          </div>
          <div className="bioTextContainer">
            <p className="normalText">
              I'm your AI therapist, ready to listen and support you 24 / 7.
              Share your thoughts, worries, or triumphs. I'm here to guide you
              on your journey to well-being. Let's chat and navigate life
              together.
            </p>
          </div>
        </div>
      </div>
      <div className="buttonContainer">
        <button className="primaryButton" onClick={handleChatButtonClick}>
          chat with John
        </button>
      </div>
      {chatting && (
        <>
          <div className="modalOverlay"></div>
          <TextingScreen name={"John"} handleBackClick={handleBackClick} />
        </>
      )}
    </>
  );
}

export default ChatTherapist;
