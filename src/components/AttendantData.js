import React from "react";

// Simple and effective 🤘
// Rename to Attendant to keep it even more simple.
const AttendantData = ({ name, lastName, jobTitle, age }) => {
  return (
    <div className="attendant-data">
      <p>{name}</p>
      <p>{lastName}</p>
      <p>{jobTitle}</p>
      <p>{age}</p>
    </div>
  );
};

export default AttendantData;
