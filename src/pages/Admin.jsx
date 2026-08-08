import { useEffect, useState } from "react";
import DashboardCards from "../components/admin/DashboardCards";
import SearchBar from "../components/admin/SearchBar";
import AdminMedicineTable from "../components/admin/AdminMedicineTable";
import AddMedicine from "../components/admin/AddMedicine";
import DiagnosisManager from "../components/admin/DiagnosisManager";
import AddDiagnosis from "../components/admin/AddDiagnosis";
import apiFetch from "../utils/apiFetch";

function Admin() {
  const [medicines, setMedicines] = useState([]);
  const [diagnoses, setDiagnoses] = useState([]);
  const [search, setSearch] = useState("");
  const [editingMedicine, setEditingMedicine] = useState(null);

  useEffect(() => {
    fetchMedicines();
    fetchDiagnoses();
  }, []);

  const fetchMedicines = async () => {
    const res = await apiFetch("/api/medicines");
    const data = await res.json();
    setMedicines(data);
  };

  const fetchDiagnoses = async () => {
    const res = await apiFetch("/api/diagnoses");
    const data = await res.json();
    setDiagnoses(data);
  };

  const deleteMedicine = async (id) => {
    const confirmDelete = window.confirm("Delete this medicine?");

    if (!confirmDelete) return;

    await apiFetch(`/api/medicines/${id}`, {
      method: "DELETE",
    });

    fetchMedicines();
  };

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "30px" }}>
      <h1>🏥 Admin Panel</h1>

      <DashboardCards
        medicineCount={medicines.length}
        diagnosisCount={diagnoses.length}
      />

      <AddMedicine
        onMedicineAdded={fetchMedicines}
        editingMedicine={editingMedicine}
        setEditingMedicine={setEditingMedicine}
      />

      <AddDiagnosis
        onDiagnosisAdded={fetchDiagnoses}
      />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <AdminMedicineTable
        medicines={filteredMedicines}
        onDelete={deleteMedicine}
        onEdit={setEditingMedicine}
      />

      <DiagnosisManager />
    </div>
  );
}

export default Admin;