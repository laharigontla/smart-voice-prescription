function DashboardCards({ medicineCount, diagnosisCount }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          flex: 1,
          background: "#1976d2",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>{medicineCount}</h2>
        <p>Medicines</p>
      </div>

      <div
        style={{
          flex: 1,
          background: "#22c55e",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>{diagnosisCount}</h2>
        <p>Diagnoses</p>
      </div>
    </div>
  );
}

export default DashboardCards;