// LeftSide.js
import React from "react";
import "./LeftSide.css";

const LeftSide = () => {
  return (
    <div className="leftside-container">
      <img
        src={require("./images/image 401.png")}
        alt="Quality Education"
        className="quality-image"
      />
      <div className="text-section">
        <h2>Quality Education</h2>
        <p>
          Ensure inclusive and equitable quality education and promote lifelong
          learning opportunities for all.
        </p>
      </div>

      <div className="separator"></div> {/* The line between sections */}

      <div className="did-you-know">
        <h4>DID YOU KNOW?</h4>
        <p>
          Without additional measures, 84 million youth will be out of school by 2030.
        </p>
      </div>
    </div>
  );
};

export default LeftSide;
