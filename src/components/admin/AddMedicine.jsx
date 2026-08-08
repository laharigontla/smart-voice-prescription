import { useEffect, useState } from "react";
import apiFetch from "../../utils/apiFetch";

function AddMedicine({
  onMedicineAdded,
  editingMedicine,
  setEditingMedicine,
}) {
  const [form, setForm] = useState({
    name: "",
    molecule: "",
    type: "",
    manufacturer: "",
  });

  useEffect(() => {
    if (editingMedicine) {
      setForm({
        name: editingMedicine.name || "",
        molecule: editingMedicine.molecule || "",
        type: editingMedicine.type || "",
        manufacturer: editingMedicine.manufacturer || "",
      });
    }
  }, [editingMedicine]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      molecule: "",
      type: "",
      manufacturer: "",
    });

    setEditingMedicine(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingMedicine
      ? `/api/medicines/${editingMedicine._id}`
      : `/api/medicines`;

    const method = editingMedicine ? "PUT" : "POST";

    const response = await apiFetch(url, {
      method,
      body: JSON.stringify(form),
    });

    const data = await response.json();

    alert(data.message);

    resetForm();

    onMedicineAdded();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
      <h2>
        {editingMedicine ? "Edit Medicine" : "Add Medicine"}
      </h2>

      <input
        name="name"
        placeholder="Medicine Name"
        value={form.name}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="molecule"
        placeholder="Molecule"
        value={form.molecule}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="type"
        placeholder="Type"
        value={form.type}
        onChange={handleChange}
      />

      <br />
      <br />

      <input
        name="manufacturer"
        placeholder="Manufacturer"
        value={form.manufacturer}
        onChange={handleChange}
      />

      <br />
      <br />

      <button type="submit">
        {editingMedicine ? "Update Medicine" : "Save Medicine"}
      </button>

      {editingMedicine && (
        <button
          type="button"
          onClick={resetForm}
          style={{
            marginLeft: "10px",
          }}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default AddMedicine;