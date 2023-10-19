import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import { addAttendant, getAttendants, getJobTitles } from "./api";
import LoadingSpinner from "./components/LoadingSpinner";
import AttendantData from "./components/AttendantData";

function App() {
  const [isJobTitlesLoading, setIsJobTitlesLoading] = useState(true);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [isPostError, setIsPostError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isAttendantDataLoading, setIsAttendantDataLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    jobTitle: "",
    age: "",
  });
  const [attendantData, setAttendantData] = useState(null);
  const [newAttendantData, setNewAttendantData] = useState(attendantData);

  const [selectOptions, setSelectOptions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPostLoading(true);

    const formDataWithId = {
      ...formData,
      id: formData.name + "_" + formData.lastName,
    };

    const alreadyExists = newAttendantData
      ? newAttendantData.find((el) => el.id === formDataWithId.id)
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
      if (prev) {
        const prevArr = Array.from(prev);

        prevArr.push(formDataWithId);

        return prevArr;
      } else {
        return [formDataWithId];
      }
    });

    const postAttendant = async () => {
      const addedAttendant = await addAttendant(formData);
      setIsPostLoading(false);

      if (!addedAttendant) {
        throw new Error("Unable to add attendant.");
      }
    };

    postAttendant();
  };

  useEffect(() => {
    const fetchJobTitles = async () => {
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
            ?.sort((a, b) => a.age - b.age)
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
