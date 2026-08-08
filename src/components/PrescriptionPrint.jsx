import "../styles/PrescriptionPrint.css";

function PrescriptionPrint({ prescription }) {
  return (
    <div id="print-area" className="print-preview">

      {/* Header */}
      <div className="preview-header">

        <div className="preview-live">

        </div>

        <div className="hospital">
          <h1>Hospital</h1>
        </div>

      </div>

      <hr className="divider" />

      {/* Patient Details */}

      <section className="patient-section">

  <h3 className="section-heading">
    Patient Information
  </h3>

  <div className="patient-grid">

  {prescription.patientName && (
    <div className="info-card">
      <span className="label">Patient Name</span>
      <span className="value">
        {prescription.patientName}
      </span>
    </div>
  )}

  {(prescription.age || prescription.gender) && (
    <div className="info-card">
      <span className="label">Age / Gender</span>
      <span className="value">
        {prescription.age || ""}
        {prescription.age && prescription.gender ? " / " : ""}
        {prescription.gender || ""}
      </span>
    </div>
  )}

  {prescription.bloodGroup && (
    <div className="info-card">
      <span className="label">Blood Group</span>
      <span className="value">
        {prescription.bloodGroup}
      </span>
    </div>
  )}

  {prescription.weight && (
    <div className="info-card">
      <span className="label">Weight</span>
      <span className="value">
        {prescription.weight} kg
      </span>
    </div>
  )}

  {prescription.bp && (
    <div className="info-card">
      <span className="label">BP</span>
      <span className="value">
        {prescription.bp}
      </span>
    </div>
  )}

  {prescription.pfrA && (
  <div className="info-card">
    <span className="label">PFR</span>
    <span className="value">
      {prescription.pfrA} / {prescription.pfrB}
    </span>
  </div>
)}

  {prescription.height && (
  <div className="info-card">
    <span className="label">HEIGHT</span>
    <span className="value">{prescription.height} cm</span>
  </div>
)}

{prescription.pulse && (
  <div className="info-card">
    <span className="label">PULSE</span>
    <span className="value">{prescription.pulse} bpm</span>
  </div>
)}

{prescription.spo2 && (
  <div className="info-card">
    <span className="label">SpO₂</span>
    <span className="value">{prescription.spo2}%</span>
  </div>
)}

</div>

</section>

<hr className="divider" />

{prescription.pastTreatment && (
  <>
    <div className="print-row">
  <span className="print-label">
    Past Treatment
  </span>

  <span className="print-value">
    {prescription.pastTreatment}
  </span>
</div>

    <hr className="divider" />
  </>
)}

{prescription.diagnosis && (
  <>
    <div className="print-row">
  <span className="print-label">
    Diagnosis
  </span>

  <span className="print-value">
    {prescription.diagnosis}
  </span>
</div>

    <hr className="divider" />
  </>
)}

{prescription.investigations && (
  <>
    <div className="print-row">
  <span className="print-label">
    Investigations
  </span>

  <span className="print-value">
    {prescription.investigations}
  </span>
</div>

    <hr className="divider" />
  </>
)}

      {prescription.medicines.length > 0 && (
  <>
    <SectionTitle>Prescription</SectionTitle>

<div className="print-table-wrapper">
      <table className="print-table">

        <thead>

          <tr>

            <th>Medicine</th>
            <th>Food</th>
            <th>M</th>
            <th>A</th>
            <th>E</th>
            <th>N</th>
            <th>Days</th>

          </tr>

        </thead>

        <tbody>

          {prescription.medicines.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="empty-cell"
              >
                No medicines added
              </td>

            </tr>

          ) : (

            prescription.medicines.map(
              (medicine, index) => (

                <tr key={index}>

                  <td>{medicine.medicine}</td>
                  <td>{medicine.foodTiming}</td>

                  <td>
  {medicine.morning || (medicine.morningChecked ? "✓" : "")}
</td>

<td>
  {medicine.afternoon || (medicine.afternoonChecked ? "✓" : "")}
</td>

<td>
  {medicine.evening || (medicine.eveningChecked ? "✓" : "")}
</td>

<td>
  {medicine.night || (medicine.nightChecked ? "✓" : "")}
</td>

                  <td>{medicine.days}</td>

                </tr>

              )
            )

          )}

        </tbody>

      </table>
</div>
      <hr className="divider" />
  </>
)}
      {prescription.advice && (
  <>
    <div className="print-row">
  <span className="print-label">
    Advice
  </span>

  <span className="print-value">
    {prescription.advice}
  </span>
</div>
  </>
)}

      <div className="signature">

        <div>
          ______________________
          <br />
          Doctor Signature
        </div>

        <div className="date">
          Date
          <br />
          {new Date().toLocaleDateString()}
        </div>

      </div>

    </div>
  );
}


function SectionTitle({ children }) {
  return (
    <h3 className="section-title-print">
      {children}
    </h3>
  );
}

export default PrescriptionPrint;