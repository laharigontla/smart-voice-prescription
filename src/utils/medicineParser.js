export function parseMedicineCommand(transcript) {
  const text = transcript.toLowerCase().trim();

  const medicine = {
    medicine: "",
    strength: "",
    morning: "",
    afternoon: "",
    evening: "",
    night: "",
    days: "",
  };

  // -----------------------------
  // Extract Strength
  // -----------------------------
  const strengthMatch = text.match(/(\d+)\s*(mg|ml|mcg|g)/i);

  if (strengthMatch) {
    medicine.strength =
      strengthMatch[1] + strengthMatch[2].toLowerCase();
  }

  // -----------------------------
  // Daily Frequency
  // -----------------------------
  if (
    text.includes("once daily") ||
    text.includes("once a day")
  ) {
    medicine.morning = "✓";
  }

  if (
    text.includes("twice daily") ||
    text.includes("twice a day")
  ) {
    medicine.morning = "✓";
    medicine.night = "✓";
  }

  if (
    text.includes("thrice daily") ||
    text.includes("three times daily")
  ) {
    medicine.morning = "✓";
    medicine.afternoon = "✓";
    medicine.night = "✓";
  }

  // -----------------------------
  // Individual Timings
  // -----------------------------
  if (text.includes("morning"))
    medicine.morning = "✓";

  if (text.includes("afternoon"))
    medicine.afternoon = "✓";

  if (text.includes("evening"))
    medicine.evening = "✓";

  if (text.includes("night"))
    medicine.night = "✓";

  // -----------------------------
  // Days
  // -----------------------------
  const digitMatch = text.match(/(\d+)\s*days?/);

  if (digitMatch) {
    medicine.days = digitMatch[1];
  }

  const numberWords = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
  };

  if (!medicine.days) {
    for (const word in numberWords) {
      if (
        text.includes(word + " day") ||
        text.includes(word + " days")
      ) {
        medicine.days = numberWords[word];
        break;
      }
    }
  }

  // -----------------------------
  // Remove unwanted words
  // -----------------------------
  let name = text;

  const removeWords = [
    "medicine",
    "tablet",
    "capsule",
    "syrup",
    "morning",
    "afternoon",
    "evening",
    "night",
    "once",
    "twice",
    "thrice",
    "daily",
    "times",
    "day",
    "days",
    "for",
    "a",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "mg",
    "ml",
    "mcg",
    "g",
  ];

  removeWords.forEach((word) => {
    const regex = new RegExp("\\b" + word + "\\b", "g");
    name = name.replace(regex, "");
  });

  // Remove numbers (strength/days)
  name = name.replace(/\d+/g, "");

  medicine.medicine = name.replace(/\s+/g, " ").trim();

  if (!medicine.medicine) return null;

  console.log("Medicine Parser Output:", medicine);
  
  return medicine;
}