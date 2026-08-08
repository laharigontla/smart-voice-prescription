import "./Navbar.css";
import FieldVoiceButton from "./FieldVoiceButton";

function Navbar({
  handleSave,
  handlePrint,
  clearPrescription,
  doctorName,
  setDoctorName,
  setShowHistory,
}) {


  return (
    <nav className="navbar">

      {/* Left Side */}
      <div className="navbar-left">

        <div className="logo">
          Rx
        </div>

        <div className="logo-text">
          <h2>Prescription</h2>
        </div>

      </div>

      {/* Center */}
      <div className="doctor-card">

  <span className="doctor-icon">👨‍⚕️</span>

  <input
    type="text"
    placeholder="Doctor Name"
    className="doctor-input"
    value={doctorName}
    onChange={(e) => setDoctorName(e.target.value)}
  />


</div>

      {/* Right */}
      <div className="navbar-right">

        <button onClick={clearPrescription}>
          🆕 New
        </button>

        <button onClick={handleSave}>
          💾 Save
        </button>

        <button onClick={() => setShowHistory(true)}>
          📜 History
        </button>

        <button onClick={handlePrint}>
          🖨 Print
        </button>

      </div>

    </nav>
  );
}

export default Navbar;