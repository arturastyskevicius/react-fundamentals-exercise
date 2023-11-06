import React from "react";

// It is nice that you separated this into its own component
// just keep in mind that this is not neccessary since it
// does not have much logic/functionality.
// Attendant component in contrast, makes sense to have since
// it is more convenient, readable and could be looked at as one unit.
const Button = ({ type, onClick, text, submitDisabled }) => {
  return (
    <button disabled={submitDisabled} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
