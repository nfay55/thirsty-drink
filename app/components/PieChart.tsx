'use client';

import { useMemo } from 'react';
import { ParsedIngredient } from '../types/cocktail';

interface PieChartProps {
  ingredients: ParsedIngredient[];
  size?: number;
}

interface SliceData extends ParsedIngredient {
  percent: number;
  startAngle: number;
  endAngle: number;
}

export default function PieChart({ ingredients, size = 120 }: PieChartProps) {
  const total = ingredients.reduce((sum, ing) => sum + ing.amount, 0);
  
  // Calculate pie slices using useMemo to avoid recalculation
  const slices = useMemo(() => {
    if (total === 0 || ingredients.length === 0) return [];
    
    const result: SliceData[] = [];
    let cumulativePercent = 0;
    
    for (const ingredient of ingredients) {
      const percent = (ingredient.amount / total) * 100;
      const startAngle = cumulativePercent * 3.6;
      cumulativePercent += percent;
      const endAngle = cumulativePercent * 3.6;
      
      result.push({
        ...ingredient,
        percent,
        startAngle,
        endAngle,
      });
    }
    
    return result;
  }, [ingredients, total]);
  
  if (total === 0 || ingredients.length === 0) {
    return (
      <div className="pie-chart-empty" style={{ width: size, height: size }}>
        <p>No measurable ingredients</p>
      </div>
    );
  }

  // Create SVG path for each slice
  const createSlicePath = (startAngle: number, endAngle: number, radius: number) => {
    const cx = radius;
    const cy = radius;
    
    // Convert angles to radians
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    
    // Calculate points
    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);
    
    // Determine if the arc should be drawn as a large arc
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const radius = size / 2;

  return (
    <div className="pie-chart-container">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="pie-chart"
      >
        {slices.map((slice, index) => {
          // Handle full circle case (single ingredient)
          if (slice.percent >= 99.9) {
            return (
              <circle
                key={index}
                cx={radius}
                cy={radius}
                r={radius}
                fill={slice.color}
              />
            );
          }
          
          return (
            <path
              key={index}
              d={createSlicePath(slice.startAngle, slice.endAngle, radius)}
              fill={slice.color}
              stroke="white"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
}
