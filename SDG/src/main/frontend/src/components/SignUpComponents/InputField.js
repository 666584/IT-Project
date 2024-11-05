import React from "react";
import "./InputField.css";

function InputField({ label, type, placeholder, onChange }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} onChange={onChange}/>
    </div>
  );
}

export default InputField;
