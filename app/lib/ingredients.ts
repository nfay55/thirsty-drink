import { Cocktail, ParsedIngredient } from '../types/cocktail';

// Conversion factors to oz (fluid ounces)
const CONVERSIONS: Record<string, number> = {
  'oz': 1,
  'cl': 0.33814, // 1 cl = 0.33814 oz
  'ml': 0.033814, // 1 ml = 0.033814 oz
  'tsp': 0.166667, // 1 tsp = 1/6 oz
  'tbsp': 0.5, // 1 tbsp = 0.5 oz
  'cup': 8, // 1 cup = 8 oz
  'dash': 0.03125, // dash ~ 1/32 oz
  'splash': 0.25, // splash ~ 1/4 oz
  'shot': 1.5, // shot = 1.5 oz
  'jigger': 1.5, // jigger = 1.5 oz
  'part': 1, // treat parts as 1 oz each
  'parts': 1,
};

// Generate pastel colors for ingredients
export function generatePastelColor(index: number): string {
  const hue = (index * 137.508) % 360; // Golden angle approximation for good distribution
  return `hsl(${hue}, 70%, 75%)`;
}

// Parse a measurement string and convert to oz
export function parseMeasure(measure: string | null): number | null {
  if (!measure) return null;
  
  const cleaned = measure.toLowerCase().trim();
  
  // Try to extract numeric value and unit
  // Handles formats like "1 oz", "1/2 oz", "1 1/2 oz", "2-3 oz"
  
  // Match patterns like "1 1/2", "1/2", "1-2", "1.5", "1"
  const fractionRegex = /^(\d+)?\s*(\d+)?\s*\/?\s*(\d+)?\s*(oz|cl|ml|tsp|tbsp|cup|cups|dash|dashes|splash|shot|shots|jigger|part|parts)?/i;
  const match = cleaned.match(fractionRegex);
  
  if (!match) return null;
  
  let amount = 0;
  
  // Handle whole number
  if (match[1] && !match[2] && !match[3]) {
    amount = parseFloat(match[1]);
  }
  // Handle fraction like "1/2"
  else if (match[1] && match[3] && !match[2]) {
    amount = parseFloat(match[1]) / parseFloat(match[3]);
  }
  // Handle mixed number like "1 1/2"
  else if (match[1] && match[2] && match[3]) {
    amount = parseFloat(match[1]) + (parseFloat(match[2]) / parseFloat(match[3]));
  }
  // Handle decimal
  else if (match[1]) {
    amount = parseFloat(match[1]);
  }
  
  if (isNaN(amount) || amount <= 0) return null;
  
  // Check for unit in the full string and get conversion factor
  let conversionFactor = 1; // Default to 1 (treat as oz)
  
  for (const [unitName, factor] of Object.entries(CONVERSIONS)) {
    if (cleaned.includes(unitName)) {
      conversionFactor = factor;
      break;
    }
  }
  
  return amount * conversionFactor;
}

// Extract all ingredients from a cocktail
export function extractIngredients(cocktail: Cocktail): ParsedIngredient[] {
  const ingredients: ParsedIngredient[] = [];
  
  for (let i = 1; i <= 15; i++) {
    const ingredientKey = `strIngredient${i}` as keyof Cocktail;
    const measureKey = `strMeasure${i}` as keyof Cocktail;
    
    const ingredient = cocktail[ingredientKey] as string | null;
    const measure = cocktail[measureKey] as string | null;
    
    if (ingredient && ingredient.trim()) {
      const amount = parseMeasure(measure);
      
      ingredients.push({
        name: ingredient.trim(),
        originalMeasure: measure?.trim() || '',
        amount: amount || 0, // Use 0 for ingredients without valid measurements
        color: generatePastelColor(i - 1),
      });
    }
  }
  
  return ingredients;
}

// Get ingredients with valid amounts for pie chart
export function getChartableIngredients(ingredients: ParsedIngredient[]): ParsedIngredient[] {
  return ingredients.filter(ing => ing.amount > 0);
}

