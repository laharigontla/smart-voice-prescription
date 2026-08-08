import Fuse from "fuse.js";
import apiFetch from "./apiFetch";

export async function fuzzyMedicineSearch(spokenMedicine) {
  try {
    // Fetch medicines from MongoDB
    const response = await apiFetch(`/api/medicines`);
    const medicines = await response.json();

    if (!medicines.length) return null;

    // Configure Fuse.js
    const fuse = new Fuse(medicines, {
      keys: ["name"],
      includeScore: true,
      threshold: 0.4, // Lower = stricter, Higher = more flexible
      ignoreLocation: true,
      minMatchCharLength: 2,
    });

    const results = fuse.search(spokenMedicine);

    console.log("Fuse Results:", results);

    if (results.length === 0) {
      return null;
    }

    return results[0].item;

  } catch (error) {
    console.error(error);
    return null;
  }
}