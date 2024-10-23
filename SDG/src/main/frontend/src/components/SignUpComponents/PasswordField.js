import React, { useState } from "react";
import "./PasswordField.css";

function PasswordField({ label, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="password-field">
      <label>{label}</label>
      <div className="password-input">
        <input
          type={visible ? "text" : "password"}
          placeholder="Password@1234"
          onChange={onChange}
        />
        <button
          type="button"
          className="toggle-visibility"
          onClick={() => setVisible(!visible)}
        >
          <img
            src={require("./image/hide.png")}
            alt="Toggle visibility"
          />
        </button>
      </div>
    </div>
  );
}

export default PasswordField;
