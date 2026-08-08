import malePFR from "../data/malePFR";
import femalePFR from "../data/femalePFR";
import childrenPFR from "../data/childrenPFR";

// Find nearest age available in chart
function getChartAge(age) {
  age = Number(age);

  if (age < 20) return 15;
  if (age < 25) return 20;
  if (age < 30) return 25;
  if (age < 35) return 30;
  if (age < 40) return 35;
  if (age < 45) return 40;
  if (age < 50) return 45;
  if (age < 55) return 50;
  if (age < 60) return 55;
  if (age < 65) return 60;
  if (age < 70) return 65;

  return 70;
}

// Convert entered height into chart height
function getHeightColumn(height, gender) {
  if (gender === "male") {
    if (height < 160) return 150;
    if (height < 168) return 160;
    if (height < 175) return 168;
    if (height < 183) return 175;
    if (height < 191) return 183;
    return 191;
  }

  if (gender === "female") {
    if (height < 145) return 137;
    if (height < 152) return 145;
    if (height < 160) return 152;
    if (height < 168) return 160;
    if (height < 175) return 168;
    return 175;
  }

  return null;
}

function getChildrenHeight(inches) {
  if (inches <= 43) return 43;
  if (inches >= 67) return 67;

  return Math.round(inches);
}

export default function getPredictedPFR(age, height, gender) {
  if (!age || !height) return "";

  const patientAge = Number(age);

  // Children (<15 years)
  if (patientAge < 15) {
    const chartHeight = getChildrenHeight(Number(height));

return childrenPFR[chartHeight] || "";
  }

  // Adults (15 years and above)
  if (!gender) return "";

  const chartAge = getChartAge(patientAge);
  const heightColumn = getHeightColumn(Number(height), gender);

  const table = gender === "male" ? malePFR : femalePFR;

  return table?.[chartAge]?.[heightColumn] || "";
}