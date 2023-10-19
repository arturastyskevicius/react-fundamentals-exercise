import React from "react";

const Button = ({ type, onClick, text, submitDisabled }) => {
  return (
    <button disabled={submitDisabled} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
