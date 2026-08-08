function ChiefComplaint({ prescription, setPrescription }) {
  return (
    <div>
      <div className="voice-field">
  <h2 className="section-title" style={{ marginBottom: 0 }}>
    Chief Complaint
  </h2>
</div>

      <textarea
        rows="5"
        placeholder="Enter chief complaint..."
        value={prescription.chiefComplaint}
        onChange={(e) =>
          setPrescription({
            ...prescription,
            chiefComplaint: e.target.value,
          })
        }
      />
    <div>
      <div className="voice-field">
  <h2 className="section-title" style={{ marginBottom: 0 }}>
    Past Treatment
  </h2>
</div>

        <textarea
          rows="5"
          placeholder="Enter past treatment..."
          value={prescription.pastTreatment}
          onChange={(e) =>
            setPrescription({
              ...prescription,
              pastTreatment: e.target.value,
            })
          }
        />
      </div>
      
    </div>
  );
}

export default ChiefComplaint;