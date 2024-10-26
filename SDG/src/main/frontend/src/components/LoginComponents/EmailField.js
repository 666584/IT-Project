import React from "react";
import "./EmailField.css";

function EmailField({ label, type, placeholder, onChange }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} onChange={onChange}/>
    </div>
  );
}

export default EmailField;
