import React from "react";
import LoginImg from '../../assets/LoginAssets/image/login.png';
import "./Illustration.css";

function Illustration() {
  return (
    <div className="illustration">
      <img
        src={LoginImg}
        alt="Sign Up Illustration"
        className="illustration-img"
      />
    </div>
  );
}

export default Illustration;
