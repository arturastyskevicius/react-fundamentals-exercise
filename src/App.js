import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { addAttendant, getAttendants, getJobTitles } from "./api";
import LoadingSpinner from "./components/LoadingSpinner";
import AttendantData from "./components/AttendantData";

function App() {
  const [isJobTitlesLoading, setIsJobTitlesLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(false); // Could be made more clear what is loading. e.g. isAttendantUploadLoading
  const [isPostError, setIsPostError] = useState(false); // This variable could be removed since errorText by itself is enough.
  const [errorText, setErrorText] = useState("");
  const [isAttendantDataLoading, setIsAttendantDataLoading] = useState(true);
  // Great stuff 🤘 This is the most common and generic approach to storing form data
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    jobTitle: "",
    age: "",
  });
  // attendantsData or attendants (plural) to make it clear that it is an array
  const [attendantData, setAttendantData] = useState(null);
  // I think it would have made it easier to go with just one attendant data state.
  // Optimistic api calls were not the intention of the exercise but interesting approach regardless.
  const [newAttendantData, setNewAttendantData] = useState(attendantData);

  const [selectOptions, setSelectOptions] = useState([]); // This can be named jobTitles for clarity

  const handleSubmit = (e) => {
    e.preventDefault();
    // the loading function can be set right before and after the api call
    setIsPostLoading(true);

    // Can be renamed to newAttendant
    const formDataWithId = {
      ...formData,
      id: formData.name + "_" + formData.lastName,
    };

    // Clarify variable attendantAlreadyExists
    const alreadyExists = newAttendantData
      ? newAttendantData.find((el) => el.id === formDataWithId.id) // instead of find, .some can be used
      : false;

    if (alreadyExists) {
      setIsPostError(true);
      setIsPostLoading(false);
      setErrorText("User already exists");
      return;
    }

    const formDataFieldsEmpty =
      !formData.name ||
      !formData.lastName ||
      !formData.jobTitle ||
      !formData.age;

    if (formDataFieldsEmpty) {
      setIsPostError(true);
      setIsPostLoading(false);
      setErrorText("One or more fields are empty");
      return;
    }
    setNewAttendantData((prev) => {
      // Can be simplified to return prev ? [...prev, formDataWithId] : [formDataWithId]
      if (prev) {
        const prevArr = Array.from(prev);

        prevArr.push(formDataWithId);

        return prevArr;
      } else {
        return [formDataWithId];
      }
    });

    const postAttendant = async () => {
      // To keep it consistent (like in the useEffect), name this addAttendantResponse
      const addedAttendant = await addAttendant(formData);
      setIsPostLoading(false);

      if (!addedAttendant) {
        // This error can be handled e.g. setting the error text state
        throw new Error("Unable to add attendant.");
      }
    };

    postAttendant();
  };

  useEffect(() => {
    // fetchJobTitles and fetchAttendantData functions can have their separate
    // useEffects to keep the code more readable (which will also simplify `fetchJobTitles` logic)
    const fetchJobTitles = async () => {
      // Instead of res it can be named jobTitlesReponse to keep it more readable
      const res = await getJobTitles();

      if (res.data && selectOptions.length === 0) {
        const sortedSelectOptions = res.data.sort();

        setSelectOptions(sortedSelectOptions);
        setFormData((prev) => ({ ...prev, jobTitle: sortedSelectOptions[0] }));
        setIsJobTitlesLoading(false);
      }
    };

    const fetchAttendantData = async () => {
      const res = await getAttendants();

      if (res.data && !attendantData) {
        setAttendantData(res.data);
        setIsAttendantDataLoading(false);
      }
    };

    fetchJobTitles();
    fetchAttendantData();
  }, [attendantData, selectOptions]);

  return (
    <div>
      <h1 className="center-text">2023 React Fundamentals Workshop</h1>
      <div>Add code here</div>

      {/* This whole section can be extracted to renderForm, renderAttendants functions to keep it super clean.
          e.g.
          const renderForm = () => {
            if (isAttendantDataLoading || isJobTitlesLoading) { 
              return <LoadingSpinner />
            }

            return (
              <Form
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                selectOptions={selectOptions}
                submitDisabled={isPostLoading}
              />
            )
          }

          and then inside the component return:

          {renderForm()}
      */}
      {isAttendantDataLoading || isJobTitlesLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {isPostError && <p>Error: {errorText}</p>}
          <Form
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            selectOptions={selectOptions}
            submitDisabled={isPostLoading}
          />
          {newAttendantData
            ?.sort((a, b) => a.age - b.age) //
            .map((attendant) => (
              <AttendantData
                key={`${attendant.name}_${attendant.lastName}`}
                name={attendant.name}
                lastName={attendant.lastName}
                jobTitle={attendant.jobTitle}
                age={attendant.age}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default App;
