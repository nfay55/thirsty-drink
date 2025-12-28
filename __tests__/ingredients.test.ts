import {
  parseMeasure,
  generatePastelColor,
  extractIngredients,
  getChartableIngredients,
} from '../app/lib/ingredients';
import { Cocktail, ParsedIngredient } from '../app/types/cocktail';

describe('parseMeasure', () => {
  describe('returns null for invalid inputs', () => {
    it('returns null for null input', () => {
      expect(parseMeasure(null)).toBeNull();
    });

    it('returns null for empty string', () => {
      expect(parseMeasure('')).toBeNull();
    });

    it('returns null for non-numeric string', () => {
      expect(parseMeasure('some')).toBeNull();
    });
  });

  describe('parses whole numbers', () => {
    it('parses "1 oz"', () => {
      expect(parseMeasure('1 oz')).toBe(1);
    });

    it('parses "2 oz"', () => {
      expect(parseMeasure('2 oz')).toBe(2);
    });

    it('parses "3 oz" case insensitive', () => {
      expect(parseMeasure('3 OZ')).toBe(3);
    });
  });

  describe('parses fractions', () => {
    it('parses "1/2 oz"', () => {
      expect(parseMeasure('1/2 oz')).toBe(0.5);
    });

    it('parses "1/4 oz"', () => {
      expect(parseMeasure('1/4 oz')).toBe(0.25);
    });

    it('parses "3/4 oz"', () => {
      expect(parseMeasure('3/4 oz')).toBe(0.75);
    });
  });

  describe('parses mixed numbers', () => {
    it('parses "1 1/2 oz"', () => {
      expect(parseMeasure('1 1/2 oz')).toBe(1.5);
    });

    it('parses "2 1/4 oz"', () => {
      expect(parseMeasure('2 1/4 oz')).toBe(2.25);
    });
  });

  describe('converts different units to oz', () => {
    it('converts cl to oz (1 cl ≈ 0.33814 oz)', () => {
      const result = parseMeasure('3 cl');
      expect(result).toBeCloseTo(3 * 0.33814, 4);
    });

    it('converts ml to oz (1 ml ≈ 0.033814 oz)', () => {
      const result = parseMeasure('30 ml');
      expect(result).toBeCloseTo(30 * 0.033814, 4);
    });

    it('converts tsp to oz (1 tsp ≈ 0.166667 oz)', () => {
      const result = parseMeasure('2 tsp');
      expect(result).toBeCloseTo(2 * 0.166667, 4);
    });

    it('converts tbsp to oz (1 tbsp = 0.5 oz)', () => {
      const result = parseMeasure('2 tbsp');
      expect(result).toBe(1);
    });

    it('converts cup to oz (1 cup = 8 oz)', () => {
      const result = parseMeasure('1 cup');
      expect(result).toBe(8);
    });

    it('converts shot to oz (1 shot = 1.5 oz)', () => {
      const result = parseMeasure('1 shot');
      expect(result).toBe(1.5);
    });

    it('converts dash to oz (1 dash ≈ 0.03125 oz)', () => {
      const result = parseMeasure('2 dashes');
      expect(result).toBeCloseTo(2 * 0.03125, 4);
    });
  });
});

describe('generatePastelColor', () => {
  it('returns a valid HSL color string', () => {
    const color = generatePastelColor(0);
    expect(color).toMatch(/^hsl\(\d+(\.\d+)?, 70%, 75%\)$/);
  });

  it('generates different colors for different indices', () => {
    const color1 = generatePastelColor(0);
    const color2 = generatePastelColor(1);
    const color3 = generatePastelColor(2);
    
    expect(color1).not.toBe(color2);
    expect(color2).not.toBe(color3);
    expect(color1).not.toBe(color3);
  });

  it('generates colors consistently (same index = same color)', () => {
    const color1 = generatePastelColor(5);
    const color2 = generatePastelColor(5);
    
    expect(color1).toBe(color2);
  });
});

describe('extractIngredients', () => {
  const mockCocktail: Cocktail = {
    idDrink: '11007',
    strDrink: 'Margarita',
    strDrinkThumb: 'https://example.com/margarita.jpg',
    strInstructions: 'Mix all ingredients.',
    strCategory: 'Ordinary Drink',
    strGlass: 'Cocktail glass',
    strIngredient1: 'Tequila',
    strIngredient2: 'Triple sec',
    strIngredient3: 'Lime juice',
    strIngredient4: 'Salt',
    strIngredient5: null,
    strMeasure1: '1 1/2 oz',
    strMeasure2: '1/2 oz',
    strMeasure3: '1 oz',
    strMeasure4: null,
    strMeasure5: null,
  };

  it('extracts all non-null ingredients', () => {
    const ingredients = extractIngredients(mockCocktail);
    
    expect(ingredients).toHaveLength(4);
    expect(ingredients.map(i => i.name)).toEqual([
      'Tequila',
      'Triple sec',
      'Lime juice',
      'Salt',
    ]);
  });

  it('parses measures correctly', () => {
    const ingredients = extractIngredients(mockCocktail);
    
    expect(ingredients[0].amount).toBe(1.5); // 1 1/2 oz
    expect(ingredients[1].amount).toBe(0.5); // 1/2 oz
    expect(ingredients[2].amount).toBe(1);   // 1 oz
    expect(ingredients[3].amount).toBe(0);   // no measure
  });

  it('preserves original measure strings', () => {
    const ingredients = extractIngredients(mockCocktail);
    
    expect(ingredients[0].originalMeasure).toBe('1 1/2 oz');
    expect(ingredients[1].originalMeasure).toBe('1/2 oz');
    expect(ingredients[2].originalMeasure).toBe('1 oz');
    expect(ingredients[3].originalMeasure).toBe('');
  });

  it('assigns colors to each ingredient', () => {
    const ingredients = extractIngredients(mockCocktail);
    
    ingredients.forEach(ingredient => {
      expect(ingredient.color).toMatch(/^hsl\(/);
    });
  });

  it('handles empty cocktail', () => {
    const emptyCocktail: Cocktail = {
      idDrink: '00000',
      strDrink: 'Empty',
      strDrinkThumb: '',
      strInstructions: '',
      strCategory: null,
      strGlass: null,
    };
    
    const ingredients = extractIngredients(emptyCocktail);
    expect(ingredients).toHaveLength(0);
  });
});

describe('getChartableIngredients', () => {
  it('filters out ingredients with zero amount', () => {
    const ingredients: ParsedIngredient[] = [
      { name: 'Tequila', originalMeasure: '1 oz', amount: 1, color: 'hsl(0, 70%, 75%)' },
      { name: 'Salt', originalMeasure: '', amount: 0, color: 'hsl(137, 70%, 75%)' },
      { name: 'Lime juice', originalMeasure: '1/2 oz', amount: 0.5, color: 'hsl(275, 70%, 75%)' },
    ];
    
    const chartable = getChartableIngredients(ingredients);
    
    expect(chartable).toHaveLength(2);
    expect(chartable.map(i => i.name)).toEqual(['Tequila', 'Lime juice']);
  });

  it('returns empty array when all amounts are zero', () => {
    const ingredients: ParsedIngredient[] = [
      { name: 'Garnish', originalMeasure: '', amount: 0, color: 'hsl(0, 70%, 75%)' },
      { name: 'Ice', originalMeasure: '', amount: 0, color: 'hsl(137, 70%, 75%)' },
    ];
    
    const chartable = getChartableIngredients(ingredients);
    expect(chartable).toHaveLength(0);
  });

  it('returns all ingredients when all have amounts', () => {
    const ingredients: ParsedIngredient[] = [
      { name: 'A', originalMeasure: '1 oz', amount: 1, color: 'hsl(0, 70%, 75%)' },
      { name: 'B', originalMeasure: '2 oz', amount: 2, color: 'hsl(137, 70%, 75%)' },
    ];
    
    const chartable = getChartableIngredients(ingredients);
    expect(chartable).toHaveLength(2);
  });
});

