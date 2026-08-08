import { useEffect, useState } from "react";
import FieldVoiceButton from "./FieldVoiceButton";
import CreatableSelect from "react-select/creatable";
import { parseMedicineCommand } from "../utils/medicineParser";
import { fuzzyMedicineSearch } from "../utils/fuzzyMedicineSearch";
import apiFetch from "../utils/apiFetch";

function MedicineTable({
  prescription,
  setPrescription,
  activeField,
  setActiveField,
  suggestions,
}) {

  const [allMedicines, setAllMedicines] = useState([]);

const [newMedicine, setNewMedicine] = useState({
  medicine: "",
  foodTiming: "After Lunch",
  morning: "",
  morningChecked: false,
  afternoon: "",
  afternoonChecked: false,
  evening: "",
  eveningChecked: false,
  night: "",
  nightChecked: false,
  days: "",
});
  const medicineOptions = allMedicines.map((med) => ({
  value: med.name,
  label: med.molecule
    ? `${med.name} (${med.molecule})`
    : med.name,
}));

  useEffect(() => {
  const fetchMedicines = async () => {
    try {
      const response = await apiFetch(
        `/api/medicines`
      );

      const data = await response.json();

      setAllMedicines(data);

    } catch (err) {
      console.error(err);
    }
  };

  fetchMedicines();
}, []);

  return (
    <div>
      <div className="voice-field">
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }}
>
  <h2 className="section-title" style={{ marginBottom: 0 }}>
    Prescription
  </h2>

</div>

        <FieldVoiceButton
  field="medicine"
  activeField={activeField}
  setActiveField={setActiveField}
  onResult={async (text) => {
  const medicine = parseMedicineCommand(text);

  if (!medicine) return;

  try {
    // First try exact search
const searchResponse = await apiFetch(
  `/api/medicines/search/${encodeURIComponent(
    medicine.medicine
  )}`
);

let dbMedicine = await searchResponse.json();

// If exact search fails, try fuzzy search
if (!dbMedicine) {
  dbMedicine = await fuzzyMedicineSearch(medicine.medicine);

  if (dbMedicine) {
    const useSuggestion = window.confirm(
      `Did you mean "${dbMedicine.name}"?`
    );

    if (useSuggestion) {
      medicine.medicine = dbMedicine.name;
      medicine.molecule = dbMedicine.molecule || medicine.molecule;
    } else {
      dbMedicine = null;
    }
  }
}

    // If medicine not found
    if (!dbMedicine) {
      const saveMedicine = window.confirm(
        `${medicine.medicine} was not found in the database.\n\nDo you want to save it?`
      );

      if (!saveMedicine) return;

      const addResponse = await apiFetch(
        `/api/medicines`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: medicine.medicine,
            molecule: "",
            type: "Tablet",
            manufacturer: "Unknown",
          }),
        }
      );

      const added = await addResponse.json();
      dbMedicine = added.medicine;
    }

    // Prevent duplicate medicines
    const alreadyExists = prescription.medicines.some(
      (m) =>
        m.medicine.toLowerCase() ===
        medicine.medicine.toLowerCase()
    );

    if (alreadyExists) {
      alert("Medicine already added.");
      return;
    }

    // Add medicine to prescription
    setPrescription((prev) => ({
  ...prev,
  medicines: [
    ...prev.medicines,
    {
      medicine: medicine.medicine,
      foodTiming: "After Lunch",
      morning: medicine.morning,
      morningChecked: false,
      afternoon: medicine.afternoon,
      afternoonChecked: false,
      evening: medicine.evening,
      eveningChecked: false,
      night: medicine.night,
      nightChecked: false,
      days: medicine.days,
    },
  ],
}));
  } catch (error) {
    console.error(error);
    alert("Unable to process medicine.");
  }
}}
/>
      </div>

<div className="medicine-table-wrapper">
      <table className="medicine-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Food</th>
            <th>M</th>
            <th>A</th>
            <th>E</th>
            <th>N</th>
            <th>Days</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
<tr>

<td style={{minWidth:"220px"}}>

<CreatableSelect
  options={medicineOptions}
  placeholder="Search or type new medicine..."
  isSearchable
  isClearable
  menuPortalTarget={document.body}
  menuPosition="fixed"
  menuPlacement="auto"

  styles={{
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
}}
  value={
    newMedicine.medicine
      ? {
          value: newMedicine.medicine,
          label: newMedicine.medicine,
        }
      : null
  }

  onChange={(selected) =>
    setNewMedicine((prev) => ({
      ...prev,
      medicine: selected ? selected.value : "",
    }))
  }

  onCreateOption={(inputValue) =>
    setNewMedicine((prev) => ({
      ...prev,
      medicine: inputValue,
    }))
  }
/>

<datalist id="medicine-list-new">
  {allMedicines.map((med) => (
    <option
      key={med._id}
      value={med.name}
    />
  ))}
</datalist>

</td>

<td>
  <label className="switch">
    <input
      type="checkbox"
      checked={newMedicine.foodTiming === "Before Lunch"}
      onChange={(e) =>
        setNewMedicine({
          ...newMedicine,
          foodTiming: e.target.checked
            ? "Before Lunch"
            : "After Lunch",
        })
      }
    />
    <span className="slider"></span>
  </label>

  <div style={{ fontSize: "12px", marginTop: "4px" }}>
    {newMedicine.foodTiming}
  </div>
</td>

<td>

<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <input
    type="checkbox"
    checked={newMedicine.morningChecked}
    onChange={(e) =>
      setNewMedicine({
        ...newMedicine,
        morningChecked: e.target.checked,
      })
    }
  />

  <input
    type="text"
    value={newMedicine.morning}
    onChange={(e) =>
      setNewMedicine({
        ...newMedicine,
        morning: e.target.value,
      })
    }
    style={{ width: "55px" }}
  />
</div>

</td>

<td>

<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <input
    type="checkbox"
    checked={newMedicine.afternoonChecked}
    onChange={(e) =>
      setNewMedicine({
        ...newMedicine,
        afternoonChecked: e.target.checked,
      })
    }
  />

  <input
    type="text"
    value={newMedicine.afternoon}
    onChange={(e) =>
      setNewMedicine({
        ...newMedicine,
        afternoon: e.target.value,
      })
    }
    style={{ width: "55px" }}
  />
</div>

</td>

<td>

<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <input
    type="checkbox"
    checked={newMedicine.eveningChecked}
    onChange={(e) =>
      setNewMedicine({
        ...newMedicine,
        eveningChecked: e.target.checked,
      })
    }
  />

  <input
    type="text"
    value={newMedicine.evening}
    onChange={(e) =>
      setNewMedicine({
        ...newMedicine,
        evening: e.target.value,
      })
    }
    style={{ width: "55px" }}
  />
</div>

</td>

<td>

<div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
  <input
    type="checkbox"
    checked={newMedicine.nightChecked}
    onChange={(e) =>
      setNewMedicine({
        ...newMedicine,
        nightChecked: e.target.checked,
      })
    }
  />

  <input
    type="text"
    value={newMedicine.night}
    onChange={(e) =>
      setNewMedicine({
        ...newMedicine,
        night: e.target.value,
      })
    }
    style={{ width: "55px" }}
  />
</div>

</td>

<td>

<input
type="number"
value={newMedicine.days}
onChange={(e)=>
setNewMedicine({
...newMedicine,
days:e.target.value
})
}
style={{width:"55px"}}
/>

</td>

<td>
  <button
    className="add-btn"
    onClick={async () => {
      const medicineName = newMedicine.medicine.trim();

      console.log("New Medicine:", newMedicine);
if (!medicineName) {
  alert("Please select a medicine.");
  return;
}

      try {
        const searchResponse = await apiFetch(
          `/api/medicines/search/${encodeURIComponent(
            newMedicine.medicine
          )}`
        );

        let dbMedicine = await searchResponse.json();

        if (!dbMedicine) {
          const addResponse = await apiFetch(
            `/api/medicines`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: newMedicine.medicine,
                molecule: "",
                type: "Tablet",
                manufacturer: "Unknown",
              }),
            }
          );

          const added = await addResponse.json();
          dbMedicine = added.medicine;

          const response = await apiFetch(
            `/api/medicines`
          );
          const medicines = await response.json();
          setAllMedicines(medicines);
        }

        setPrescription((prev) => ({
  ...prev,
  medicines: [
    ...prev.medicines,
    {
      medicine: newMedicine.medicine,
      foodTiming: newMedicine.foodTiming,
      morning: newMedicine.morning,
      morningChecked: newMedicine.morningChecked,
      afternoon: newMedicine.afternoon,
      afternoonChecked: newMedicine.afternoonChecked,
      evening: newMedicine.evening,
      eveningChecked: newMedicine.eveningChecked,
      night: newMedicine.night,
      nightChecked: newMedicine.nightChecked,
      days: newMedicine.days,
    },
  ],
}));

        setNewMedicine({
          medicine: "",
          foodTiming: "After Lunch",
          morning: "",
          morningChecked: false,
          afternoon: "",
          afternoonChecked: false,
          evening: "",
          eveningChecked: false,
          night: "",
          nightChecked: false,
          days: "",
        });

      } catch (error) {
        console.error(error);
        alert("Unable to save medicine.");
      }
    }}
  >
    ➕ Add
  </button>
</td>

</tr>
          
          {prescription.medicines.map((medicine, index) => (
            <tr key={index}>

<td style={{ minWidth: "220px" }}>
  <CreatableSelect
    options={medicineOptions}
    isSearchable
    isClearable
    placeholder="Select medicine"
    menuPortalTarget={document.body}
    menuPosition="fixed"
    menuPlacement="auto"
    
    styles={{
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  }}

    value={
      medicineOptions.find(
        (option) => option.value === medicine.medicine
      ) || {
        value: medicine.medicine,
        label: medicine.medicine,
      }
    }

    onChange={(selected) => {
      const updated = [...prescription.medicines];

      updated[index] = {
        ...updated[index],
        medicine: selected ? selected.value : "",
      };

      setPrescription({
        ...prescription,
        medicines: updated,
      });
    }}

    onCreateOption={(inputValue) => {
      const updated = [...prescription.medicines];

      updated[index] = {
        ...updated[index],
        medicine: inputValue,
      };

      setPrescription({
        ...prescription,
        medicines: updated,
      });
    }}
  />
</td>

<td>
  <label className="switch">
    <input
      type="checkbox"
      checked={medicine.foodTiming === "Before Lunch"}
      onChange={(e) => {
        const updated = [...prescription.medicines];

        updated[index].foodTiming = e.target.checked
          ? "Before Lunch"
          : "After Lunch";

        setPrescription({
          ...prescription,
          medicines: updated,
        });
      }}
    />
    <span className="slider"></span>
  </label>

  <div style={{ fontSize: "12px", marginTop: "4px" }}>
    {medicine.foodTiming}
  </div>
</td>
            

<td>
  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    <input
      type="checkbox"
      checked={medicine.morningChecked || false}
onChange={(e) => {
  const updated = [...prescription.medicines];
  updated[index].morningChecked = e.target.checked;

  setPrescription({
    ...prescription,
    medicines: updated,
  });
}}
    />

    <input
      type="text"
      placeholder="Morning"
      value={medicine.morning}
      onChange={(e) => {
        const updated = [...prescription.medicines];
        updated[index].morning = e.target.value;

        setPrescription({
          ...prescription,
          medicines: updated,
        });
      }}
      style={{
        width: "55px",
        padding: "5px",
        textAlign: "center",
      }}
    />
  </div>
</td>

<td>
  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    <input
      type="checkbox"
      checked={medicine.afternoonChecked || false}
onChange={(e) => {
  const updated = [...prescription.medicines];
  updated[index].afternoonChecked = e.target.checked;

  setPrescription({
    ...prescription,
    medicines: updated,
  });
}}
    />

    <input
      type="text"
      placeholder="Afternoon"
      value={medicine.afternoon}
      onChange={(e) => {
        const updated = [...prescription.medicines];
        updated[index].afternoon = e.target.value;

        setPrescription({
          ...prescription,
          medicines: updated,
        });
      }}
      style={{
        width: "55px",
        padding: "5px",
        textAlign: "center",
      }}
    />
  </div>
</td>

<td>
  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    <input
      type="checkbox"
      checked={medicine.eveningChecked || false}
onChange={(e) => {
  const updated = [...prescription.medicines];
  updated[index].eveningChecked = e.target.checked;

  setPrescription({
    ...prescription,
    medicines: updated,
  });
}}
    />

    <input
      type="text"
      placeholder="Evening"
      value={medicine.evening}
      onChange={(e) => {
        const updated = [...prescription.medicines];
        updated[index].evening = e.target.value;

        setPrescription({
          ...prescription,
          medicines: updated,
        });
      }}
      style={{
        width: "55px",
        padding: "5px",
        textAlign: "center",
      }}
    />
  </div>
</td>

<td>
  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    <input
      type="checkbox"
      checked={medicine.nightChecked || false}
onChange={(e) => {
  const updated = [...prescription.medicines];
  updated[index].nightChecked = e.target.checked;

  setPrescription({
    ...prescription,
    medicines: updated,
  });
}}
    />

    <input
      type="text"
      placeholder="Night"
      value={medicine.night}
      onChange={(e) => {
        const updated = [...prescription.medicines];
        updated[index].night = e.target.value;

        setPrescription({
          ...prescription,
          medicines: updated,
        });
      }}
      style={{
        width: "55px",
        padding: "5px",
        textAlign: "center",
      }}
    />
  </div>
</td>

<td>
  <input
    type="number"
    min="1"
    value={medicine.days}
    onChange={(e) => {
      const updatedMedicines = [...prescription.medicines];

      updatedMedicines[index].days = e.target.value;

      setPrescription({
        ...prescription,
        medicines: updatedMedicines,
      });
    }}
    style={{
      width: "55px",
      padding: "5px",
      textAlign: "center",
      borderRadius: "4px",
      border: "1px solid #ccc",
    }}
  />
</td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => {
                    const updatedMedicines =
                      prescription.medicines.filter(
                        (_, i) => i !== index
                      );

                    setPrescription({
                      ...prescription,
                      medicines: updatedMedicines,
                    });
                  }}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

      {/* ================= Quick Medicine Suggestions ================= */}

<div className="medicine-suggestions">

  <h3 className="section-title">
    💊 Medicines
  </h3>

  {suggestions.length === 0 ? (

    <p style={{ color: "#666" }}>
      Enter a diagnosis to view medicine suggestions.
    </p>

  ) : (

    <div className="suggestion-list">

      {suggestions.map((medicine) => (

  <button
    key={medicine._id}
    className="suggestion-chip"
    onClick={() =>
      setPrescription({
        ...prescription,
        medicines: [
          ...prescription.medicines,
          {
            medicine: medicine.name,
            foodTiming: "After Lunch",
            morning: "",
            morningChecked: false,
            afternoon: "",
            afternoonChecked: false,
            evening: "",
            eveningChecked: false,
            night: "",
            nightChecked: false,
            days: "",
          },
        ],
      })
    }
  >
    {medicine.name}
  </button>

))}

    </div>

  )}

</div>
    </div>
  );
}



export default MedicineTable;