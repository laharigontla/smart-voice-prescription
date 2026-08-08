import "../styles/patient.css";

function PatientDetails({
  prescription,
  setPrescription,
}) {
  return (
    <div>
      <h2 className="section-title">Patient Details</h2>

      {/* Patient Name */}
      <div className="field">
        <label>Patient Name</label>

        <input
          type="text"
          placeholder="Enter patient name"
          value={prescription.patientName}
          onChange={(e) =>
            setPrescription({
              ...prescription,
              patientName: e.target.value,
            })
          }
        />
      </div>

      {/* Age & Gender */}
      <div className="row">
        <div className="field">
          <label>Age</label>

          <input
            type="number"
            placeholder="Enter age"
            value={prescription.age}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                age: e.target.value,
              })
            }
          />
        </div>

        <div className="field">
          <label>Gender</label>

          <select
            value={prescription.gender}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                gender: e.target.value,
              })
            }
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Blood Group & Weight */}
      <div className="row">
        <div className="field">
          <label>Blood Group</label>

          <select
            value={prescription.bloodGroup}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                bloodGroup: e.target.value,
              })
            }
          >
            <option value="">Select</option>
            <option value="o+">O+</option>
            <option value="o-">O-</option>
            <option value="a+">A+</option>
            <option value="a-">A-</option>
            <option value="b+">B+</option>
            <option value="b-">B-</option>
            <option value="ab+">AB+</option>
            <option value="ab-">AB-</option>
          </select>
        </div>

        <div className="field">
          <label>Weight (kg)</label>

          <input
            type="text"
            placeholder="Weight"
            value={prescription.weight}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                weight: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Height & Pulse */}
<div className="row">

  <div className="field">
    <label>
  {Number(prescription.age) < 15
    ? "Height (inches)"
    : "Height (cm)"}
</label>

    <input
      type="text"
      placeholder={
  Number(prescription.age) < 15
    ? "Enter height in inches"
    : "Enter height in cm"
}
      value={prescription.height}
      onChange={(e) =>
        setPrescription({
          ...prescription,
          height: e.target.value,
        })
      }
    />
  </div>

  <div className="field">
    <label>Pulse (bpm)</label>

    <input
      type="text"
      placeholder="72"
      value={prescription.pulse}
      onChange={(e) =>
        setPrescription({
          ...prescription,
          pulse: e.target.value,
        })
      }
    />
  </div>

</div>

      {/* BP & Temperature */}
      <div className="row">
        <div className="field">
          <label>BP</label>

          <input
            type="text"
            placeholder="120/80"
            value={prescription.bp}
            onChange={(e) =>
              setPrescription({
                ...prescription,
                bp: e.target.value,
              })
            }
          />
        </div>

        <div className="field">
  <label>PFR</label>

  <div style={{ display: "flex", gap: "8px" }}>
    <input
      type="text"
      value={prescription.pfrA}
      onChange={(e) =>
        setPrescription({
          ...prescription,
          pfrA: e.target.value,
        })
      }
    />

    <input
  type="text"
  placeholder="Predicted"
  value={prescription.pfrB}
  readOnly
/>
  </div>
</div>
      </div>

      {/* SpO2 */}
<div className="row">

  <div className="field">
    <label>SpO₂ (%)</label>

    <input
      type="text"
      placeholder="98"
      value={prescription.spo2}
      onChange={(e) =>
        setPrescription({
          ...prescription,
          spo2: e.target.value,
        })
      }
    />
  </div>

  <div className="field"></div>

</div>
    </div>
  );
}

export default PatientDetails;