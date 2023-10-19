import React from "react";

const Input = ({ type, id, labelText, onChange, value, setValue }) => {
  return (
    <div className="input">
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type={type} onChange={onChange} value={value} />
    </div>
  );
};

export default Input;
