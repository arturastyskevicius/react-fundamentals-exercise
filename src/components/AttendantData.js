import React from "react";

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
