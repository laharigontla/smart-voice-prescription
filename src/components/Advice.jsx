import "../styles/patient.css";
import FieldVoiceButton from "./FieldVoiceButton";

function Advice({ prescription, setPrescription, activeField, setActiveField, }) {
  return (
    <div>
      <div className="voice-field">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
          Advice
        </h2>

        <FieldVoiceButton
  field="advice"
  activeField={activeField}
  setActiveField={setActiveField}
  onResult={(text) =>
    setPrescription((prev) => ({
      ...prev,
      advice: prev.advice
  ? `${prev.advice}, ${text}`
  : text,
    }))
  }
/>
      </div>

      <textarea
        rows="5"
        placeholder="Enter advice..."
        value={prescription.advice}
        onChange={(e) =>
          setPrescription({
            ...prescription,
            advice: e.target.value,
          })
        }
      />
    </div>
  );
}

export default Advice;