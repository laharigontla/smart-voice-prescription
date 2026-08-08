import "../styles/patient.css";
import FieldVoiceButton from "./FieldVoiceButton";
import apiFetch from "../utils/apiFetch";

function Diagnosis({
  prescription,
  setPrescription,
  activeField,
  setActiveField,
  setSuggestions,
}) {
  // Fetch medicine suggestions from MongoDB
  const fetchSuggestions = async (diagnosisText) => {
  if (!diagnosisText.trim()) {
    setSuggestions([]);
    return;
  }

  try {
    const response = await apiFetch(
      `/api/diagnoses/suggestions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          diagnosis: diagnosisText,
        }),
      }
    );

    const data = await response.json();

    setSuggestions(data.medicines || []);
  } catch (error) {
    console.error(error);
    setSuggestions([]);
  }
};

  return (
    <div>
      <div className="voice-field">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Diagnosis
        </h2>

        <FieldVoiceButton
          field="diagnosis"
          activeField={activeField}
          setActiveField={setActiveField}
          onResult={async (text) => {
  let updatedDiagnosis = "";

  setPrescription((prev) => {
    updatedDiagnosis = prev.diagnosis
  ? `${prev.diagnosis}, ${text}`
  : text;

    return {
      ...prev,
      diagnosis: updatedDiagnosis,
    };
  });

  await fetchSuggestions(updatedDiagnosis);
}}
        />
      </div>

      <textarea
        rows="5"
        placeholder="Enter diagnosis..."
        value={prescription.diagnosis}
        onChange={async (e) => {
          const value = e.target.value;

          setPrescription({
            ...prescription,
            diagnosis: value,
          });

          await fetchSuggestions(value);
        }}
      />
    </div>
  );
}

export default Diagnosis;