import React from "react";
import "../App.css";
import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

// It would be better instead of having a `setFormData` prop to have an `onChange` prop
// which would be called when the input changes and would return the new form data.
// In General you could store formData in this component instead of App.js (separation of concerns)
// then only onSubmit woul be needed while handleSubmit, setFormData and formData could be removed.
const Form = ({
  handleSubmit,
  formData,
  setFormData,
  selectOptions,
  submitDisabled,
}) => {
  // These functions can be simplified to a single function handleInputChange
  // which would look something like (e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value }))
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
      {/* Some empty spaces here can be removed */}

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
        // The onClick handler is not needed since submit is handled by the form onSubmit handler
        onClick={() => {}}
      />
    </form>
  );
};

export default Form;
