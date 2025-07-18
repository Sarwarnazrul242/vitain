import { ref } from "vue";
export const heightOptions = (() => {
  const heights: string[] = [];
  for (let feet = 4; feet <= 7; feet++) {
    for (let inches = 0; inches < 12; inches++) {
      if (feet === 7 && inches > 0) break; // Stop at 7'0"
      heights.push(`${feet}'${inches.toString().padStart(2, '0')}"`);
    }
  }
  return heights;
})();

export const ageOptions = Array.from({ length: 83 }, (_, i) => i + 18);

export const healthOptions = ["Excellent", "Very Good", "Good", "Fair", "Poor"];

export const symptomsList = [
  "Fever or chills",
  "Cough",
  "Shortness of breath",
  "Fatigue or low energy",
  "Body aches or muscle pain",
  "Headache",
  "Nausea or vomiting",
  "Diarrhea",
  "Loss of taste or smell",
  "None of the above"
];

export const medicalConditionsList = [
  "High blood pressure",
  "Diabetes",
  "Heart disease",
  "Kidney disease",
  "Liver disease",
  "Thyroid disorder",
  "Autoimmune disease",
  "Cancer (current or past)",
  "None of the above"
];

export const foodItems = [
  "Fruits",
  "Vegetables",
  "Protein (Meat, Fish, Eggs, Beans)",
  "Dairy (Milk, Cheese, Yogurt)",
  "Grains (Rice, Bread, Pasta)",
  "Nuts and Seeds",
  "Fats and Oils",
  "Drinks (Water, Tea, Coffee)"
];

export const supplementFormats = [
  "Capsules",
  "Tablets",
  "Powders",
  "Gummies",
  "Liquids",
  "Plant-based",
  "No preference"
];

export const healthGoalsList = [
  "Boost energy",
  "Improve sleep",
  "Support immune system",
  "Build muscle",
  "Improve skin or hair health",
  "Manage stress or anxiety",
  "Improve memory or focus",
  "Weight management",
  "General wellness"
];

export const showOtherGoals= ref(false);
