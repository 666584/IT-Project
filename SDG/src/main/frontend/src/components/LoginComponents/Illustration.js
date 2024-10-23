import React from "react";
import "./Illustration.css";

function Illustration() {
  return (
    <div className="illustration">
      <img
        src={require("./image/login.png")}
        alt="Sign Up Illustration"
        className="illustration-img"
      />
    </div>
  );
}

export default Illustration;
