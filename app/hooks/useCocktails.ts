import { useQuery } from '@tanstack/react-query';
import { searchCocktails, getCocktailById } from '../lib/api';

// Query keys for cache management
export const cocktailKeys = {
  all: ['cocktails'] as const,
  search: (query: string) => [...cocktailKeys.all, 'search', query] as const,
  detail: (id: string) => [...cocktailKeys.all, 'detail', id] as const,
};

/**
 * Hook to search cocktails by name
 * - Results are cached for 5 minutes
 * - Empty queries are not fetched
 */
export function useSearchCocktails(query: string) {
  return useQuery({
    queryKey: cocktailKeys.search(query),
    queryFn: () => searchCocktails(query),
    enabled: !!query.trim(), // Only fetch if query is not empty
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new
  });
}

/**
 * Hook to get a single cocktail by ID
 * - Results are cached for 10 minutes (cocktail details don't change often)
 */
export function useCocktailById(id: string) {
  return useQuery({
    queryKey: cocktailKeys.detail(id),
    queryFn: () => getCocktailById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // Consider fresh for 10 minutes
  });
}

