import React from "react";
import "./Illustration.css";

function Illustration() {
  return (
    <div className="illustration">
      <img
        src={require("./image/SignIN.png")}
        alt="Sign Up Illustration"
        className="signup-img"
      />
    </div>
  );
}

export default Illustration;
