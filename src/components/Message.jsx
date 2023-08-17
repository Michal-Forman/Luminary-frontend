import React from "react";

function Message(props) {
  return (
    <div
      className={props.texter ? "userMessageContainer" : "botMessageContainer"}
    >
      <p className="messageContainer">{props.message}</p>
      <img
        className="icon"
        src={
          props.texter
            ? require(`../IMG/${props.name.toLowerCase()}.png`)
            : require("../IMG/johnLogo.png")
        }
        alt="John's profile picture"
      />
    </div>
  );
}

export default Message;
