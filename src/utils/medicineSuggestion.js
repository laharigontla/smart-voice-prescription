import { diagnosisDatabase } from "../data/diagnosisDatabase";

export function getMedicineSuggestions(diagnosis) {
  if (!diagnosis) return [];

  const text = diagnosis.toLowerCase();

  const medicines = [];

  Object.keys(diagnosisDatabase).forEach((key) => {
    if (text.includes(key)) {
      medicines.push(...diagnosisDatabase[key]);
    }
  });

  // Remove duplicates
  return [...new Set(medicines)];
}