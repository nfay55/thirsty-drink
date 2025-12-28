'use client';

import { ParsedIngredient } from '../types/cocktail';

interface IngredientLegendProps {
  ingredients: ParsedIngredient[];
}

export default function IngredientLegend({ ingredients }: IngredientLegendProps) {
  return (
    <div className="ingredient-legend">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="legend-item">
          {/* Color square: 20x20, corner radius 3 */}
          <div
            className="legend-color"
            style={{ backgroundColor: ingredient.color }}
          />
          {/* Format: "Ingredient name (measure)" */}
          <span className="legend-text">
            {ingredient.name}
            {ingredient.originalMeasure && (
              <span className="legend-measure"> ({ingredient.originalMeasure})</span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
