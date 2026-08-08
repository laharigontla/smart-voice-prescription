function Investigations({ prescription, setPrescription }) {
  return (
    <div>
      <div className="voice-field">
        <h2 className="section-title" style={{ marginBottom: 0 }}>
        Investigations
        </h2>
      </div>

      <textarea
        rows="5"
        placeholder="Enter investigations (e.g., CBC, Chest X-ray, ECG, Blood Sugar)..."
        value={prescription.investigations}
        onChange={(e) =>
          setPrescription({
            ...prescription,
            investigations: e.target.value,
          })
        }
      />
    </div>
  );
}

export default Investigations;