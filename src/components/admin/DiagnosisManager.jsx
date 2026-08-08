import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import apiFetch from "../../utils/apiFetch";

function DiagnosisManager() {
  const [diagnoses, setDiagnoses] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");

  const [selectedMedicines, setSelectedMedicines] = useState([]);

  useEffect(() => {
    fetchDiagnoses();
    fetchMedicines();
  }, []);

  const fetchDiagnoses = async () => {
    const res = await apiFetch("/api/diagnoses");
    const data = await res.json();
    setDiagnoses(data);
  };

  const fetchMedicines = async () => {
    const res = await apiFetch("/api/medicines");
    const data = await res.json();
    setMedicines(data);
  };

  const saveMedicines = async () => {

  if (!selectedDiagnosis) {
    alert("Please select a diagnosis");
    return;
  }

  const response = await apiFetch(
    `/api/diagnoses/${selectedDiagnosis}/medicines`,
    {
      method: "PUT",
      body: JSON.stringify({
        medicines: selectedMedicines,
      }),
    }
  );

  const data = await response.json();

  alert(data.message);
};

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Diagnosis Management</h2>

      <CreatableSelect
  options={diagnoses.map((diagnosis) => ({
    value: diagnosis._id,
    label: diagnosis.name,
  }))}
  value={
    diagnoses
      .map((diagnosis) => ({
        value: diagnosis._id,
        label: diagnosis.name,
      }))
      .find((option) => option.value === selectedDiagnosis)
  }
  onChange={(selectedOption) =>
    setSelectedDiagnosis(selectedOption?.value || "")
  }
  placeholder="Select Diagnosis"
/>

      <h3 style={{ marginTop: "20px" }}>
        Select Medicines
      </h3>

      {medicines.map((medicine) => (

        <div key={medicine._id}>

          <label>

            <input
              type="checkbox"
              checked={selectedMedicines.includes(medicine._id)}
              onChange={(e) => {

                if (e.target.checked) {

                  setSelectedMedicines([
                    ...selectedMedicines,
                    medicine._id,
                  ]);

                } else {

                  setSelectedMedicines(
                    selectedMedicines.filter(
                      (id) => id !== medicine._id
                    )
                  );

                }

              }}
            />

            {medicine.name}

          </label>

        </div>

      ))}

      <br />

<button
  onClick={saveMedicines}
  style={{
    marginTop: "20px",
    padding: "10px 25px",
    background: "#1976d2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Save Medicines
</button>

    </div>
  );
}

export default DiagnosisManager;