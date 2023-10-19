import React from "react";

const Select = ({ options, id, labelText, name, value, onChange }) => {
  return (
    <div className="input">
      <label htmlFor={id}>{labelText}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
