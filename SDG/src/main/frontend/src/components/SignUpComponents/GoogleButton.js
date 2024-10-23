import React from "react";
import "./GoogleButton.css";

function GoogleButton() {
  return (
    <button className="google-btn">
      <img
        src={require("./image/Google.png")}
        alt="Google Icon"
        className="google-icon"
      />
      Sign in with Google
    </button>
  );
}

export default GoogleButton;
