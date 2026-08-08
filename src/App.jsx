import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import PatientDetails from "./components/PatientDetails";
import Diagnosis from "./components/Diagnosis";
import MedicineTable from "./components/MedicineTable";
import Advice from "./components/Advice";
import PrescriptionPrint from "./components/PrescriptionPrint";
import ChiefComplaint from "./components/ChiefComplaint";
import PrescriptionHistory from "./components/PrescriptionHistory";
import PrescriptionViewer from "./components/PrescriptionViewer";
import SmartAssistant from "./components/assistant/SmartAssistant";
import getPredictedPFR from "./utils/getPredictedPFR";
import Investigations from "./components/Investigations";
import apiFetch from "./utils/apiFetch";

function App() {
  const [doctorName, setDoctorName] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showPrescriptionViewer, setShowPrescriptionViewer] = useState(false);
  const [prescription, setPrescription] = useState({
  patientName: "",
  age: "",
  gender: "",
  bloodGroup: "",
  weight: "",
  height: "",
  pulse: "",
  bp: "",
  pfrA: "",
  pfrB: "",
  spo2: "",
  chiefComplaint: "",
  pastTreatment: "",
  diagnosis: "",
  investigations: "",
  advice: "",
  medicines: [],
});

  const [activeField, setActiveField] = useState(null);
  const [suggestions, setSuggestions] = useState([]); 

  const clearPrescription = () => {
    setPrescription({
      patientName: "",
      age: "",
      gender: "",
      bloodGroup: "",
      weight: "",
      height: "",
      pulse: "",
      bp: "",
      pfrA: "",
      pfrB: "",
      sp02: "",
      chiefComplaint: "",
      pastTreatment: "",
      diagnosis: "",
      advice: "",
      medicines: [],
    });
  };

  const handlePrint = () => {
  window.print();
};

useEffect(() => {
  if (
    prescription.age &&
    prescription.height &&
    prescription.gender
  ) {
    const predicted = getPredictedPFR(
      prescription.age,
      prescription.height,
      prescription.gender
    );

    setPrescription((prev) => ({
      ...prev,
      pfrB: predicted,
    }));
  }
}, [
  prescription.age,
  prescription.height,
  prescription.gender,
]);

const handleSave = async () => {
  try {
    const response = await apiFetch("/api/prescriptions", {
      method: "POST",
      body: JSON.stringify({
        ...prescription,
        doctorName,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("✅ Prescription saved successfully.");
    } else {
      alert(data.message || "Unable to save prescription.");
    }
  } catch (error) {
    console.error(error);
    alert("Server error while saving prescription.");
  }
};

  return (
    <div className="app-container">
      <Navbar
  handleSave={handleSave}
  handlePrint={handlePrint}
  clearPrescription={clearPrescription}
  doctorName={doctorName}
  setDoctorName={setDoctorName}
  prescription={prescription}
  setShowHistory={setShowHistory}
/>

      <div className="main-layout">

        {/* Left Panel */}
        <div className="left-panel">

          <div className="patient-card">

            <PatientDetails
              prescription={prescription}
              setPrescription={setPrescription}
            />

            <ChiefComplaint
              prescription={prescription}
              setPrescription={setPrescription}
            />

            <Diagnosis
              prescription={prescription}
              setPrescription={setPrescription}
              activeField={activeField}
              setActiveField={setActiveField}
              setSuggestions={setSuggestions}
            />

            <Investigations
              prescription={prescription}
              setPrescription={setPrescription}
            />

            <MedicineTable
              prescription={prescription}
              setPrescription={setPrescription}
              activeField={activeField}
              setActiveField={setActiveField}
              suggestions={suggestions}
            />

            <Advice
              prescription={prescription}
              setPrescription={setPrescription}
              activeField={activeField}
              setActiveField={setActiveField}
            />

            <SmartAssistant
  handleSave={handleSave}
  handlePrint={handlePrint}
  clearPrescription={clearPrescription}
  setShowHistory={setShowHistory}
  prescription={prescription}
  setPrescription={setPrescription}
/>

          </div>

        </div>

        {/* Right Panel */}
        <div className="right-panel">

          <PrescriptionPrint
            prescription={prescription}
          />

        </div>
      {showHistory && (
      <div className="history-overlay">
        <div className="history-modal">

          <button
            className="history-close"
            onClick={() => setShowHistory(false)}
          >
            ✖
          </button>

          <PrescriptionHistory
            setPrescription={setPrescription}
            setShowHistory={setShowHistory}
            setSelectedPrescription={setSelectedPrescription}
            setShowPrescriptionViewer={setShowPrescriptionViewer}
          />

        </div>
      </div>
    )}

      {showPrescriptionViewer && selectedPrescription && (
  <PrescriptionViewer
    prescription={selectedPrescription}
    onClose={() => setShowPrescriptionViewer(false)}
    onEdit={() => {
      setPrescription(selectedPrescription);
      setShowPrescriptionViewer(false);
      setShowHistory(false);
    }}
  />
)}
      </div> 
    </div>
  );
}

export default App;