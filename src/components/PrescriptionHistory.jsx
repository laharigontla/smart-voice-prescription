import { useEffect, useState } from "react";
import "../styles/PrescriptionHistory.css";
import apiFetch from "../utils/apiFetch";

function PrescriptionHistory({
  setSelectedPrescription,
  setShowPrescriptionViewer,
}) {

  const [prescriptions, setPrescriptions] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPrescriptions = async () => {
    try {
      const response = await apiFetch(
        `/api/prescriptions`
      );

      const data = await response.json();

      setPrescriptions(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const deletePrescription = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this prescription?"
    );

    if (!confirmDelete) return;

    try {

      await apiFetch(
        `/api/prescriptions/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchPrescriptions();

    } catch (error) {

      console.log(error);

      alert("Unable to delete prescription.");

    }

  };

  const filtered = prescriptions.filter((item) => {

    const patient =
      item.patientName?.toLowerCase() || "";

    const diagnosis =
      item.diagnosis?.toLowerCase() || "";

    return (
      patient.includes(search.toLowerCase()) ||
      diagnosis.includes(search.toLowerCase())
    );

  });

  return (
  <div className="history-container">

    <h1 className="history-title">
      📋 Patient Records
    </h1>

    <p className="history-subtitle">
      Total Prescriptions : {filtered.length}
    </p>

    <input
      className="search-box"
      placeholder="🔍 Search Patient or Diagnosis..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <div className="cards">

      {filtered.length === 0 ? (

        <div
          style={{
            textAlign: "center",
            color: "#64748b",
            padding: "40px",
            width: "100%",
          }}
        >
          No Prescriptions Found
        </div>

      ) : (

        filtered.map((item) => (

          <div
            key={item._id}
            className="patient-card-history"
          >

            <div className="patient-header">

              <div>

                <h3>
                  👤 {item.patientName || "Unknown"}
                </h3>

                <p>
                  {item.age || "-"} Years •{" "}
                  {item.gender || "-"}
                </p>

              </div>

              <div className="rx-id">
                RX-{item._id.slice(-5).toUpperCase()}
              </div>

            </div>

            <div className="patient-info">

              <span>
                📅{" "}
                {new Date(
                  item.createdAt
                ).toLocaleDateString()}
              </span>

              <span>
                💊 {item.medicines?.length || 0} Medicines
              </span>

            </div>

            <div className="diagnosis-box">

              <strong>Diagnosis</strong>

              <p>
                {item.diagnosis || "-"}
              </p>

            </div>

            <div className="card-actions">

              <button
                className="view-btn"
                onClick={() => {
                  setSelectedPrescription(item);
                  setShowPrescriptionViewer(true);
                }}
              >
                👁 View
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deletePrescription(item._id)
                }
              >
                🗑 Delete
              </button>

            </div>

          </div>

        ))

      )}

    </div>

  </div>
);
}

export default PrescriptionHistory;