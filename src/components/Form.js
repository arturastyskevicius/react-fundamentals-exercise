import React from "react";
import "../App.css";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

const Form = ({
  handleSubmit,
  formData,
  setFormData,
  selectOptions,
  submitDisabled,
}) => {
  const handleNameChange = (e) => {
    setFormData((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleLastNameChange = (e) => {
    setFormData((prev) => ({ ...prev, lastName: e.target.value }));
  };

  const handleJobTitleChange = (e) => {
    setFormData((prev) => ({ ...prev, jobTitle: e.target.value }));
  };

  const handleAgeChange = (e) => {
    setFormData((prev) => ({ ...prev, age: e.target.value }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Input
        type="text"
        labelText="Name"
        id="name"
        onChange={handleNameChange}
        value={formData.name}
      />
      <Input
        type="text"
        labelText="Last Name"
        id="lastName"
        onChange={handleLastNameChange}
        value={formData.lastName}
      />
      <Select
        labelText="Job Title"
        id="jobTitle"
        name="jobTitle"
        options={selectOptions}
        onChange={handleJobTitleChange}
        value={formData.jobTitle}
      />

      <Input
        type="text"
        labelText="Age"
        id="age"
        onChange={handleAgeChange}
        value={formData.age}
      />
      <Button
        submitDisabled={submitDisabled}
        type="submit"
        text="Submit Form"
        onClick={() => {}}
      />
    </form>
  );
};

export default Form;
