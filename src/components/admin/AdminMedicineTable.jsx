function AdminMedicineTable({ medicines, onDelete, onEdit }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr style={{ background: "#1976d2", color: "white" }}>
          <th>Name</th>
          <th>Molecule</th>
          <th>Type</th>
          <th>Manufacturer</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {medicines.map((medicine) => (
          <tr key={medicine._id}>
            <td>{medicine.name}</td>
            <td>{medicine.molecule}</td>
            <td>{medicine.type}</td>
            <td>{medicine.manufacturer}</td>

            <td>
  <button
    onClick={() => onEdit(medicine)}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      cursor: "pointer",
      marginRight: "10px",
    }}
  >
    Edit
  </button>

  <button
    onClick={() => onDelete(medicine._id)}
    style={{
      background: "#ef4444",
      color: "white",
      border: "none",
      padding: "8px 14px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdminMedicineTable;