import { CocktailSearchResponse, Cocktail } from '../types/cocktail';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function searchCocktails(query: string): Promise<Cocktail[]> {
  if (!query.trim()) {
    return [];
  }
  
  const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cocktails');
  }
  
  const data: CocktailSearchResponse = await response.json();
  return data.drinks || [];
}

export async function getCocktailById(id: string): Promise<Cocktail | null> {
  const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch cocktail');
  }
  
  const data: CocktailSearchResponse = await response.json();
  return data.drinks?.[0] || null;
}

