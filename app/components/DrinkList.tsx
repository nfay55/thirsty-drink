'use client';

import { Cocktail } from '../types/cocktail';
import DrinkListItem from './DrinkListItem';

interface DrinkListProps {
  drinks: Cocktail[];
  isLoading: boolean;
  searchQuery: string;
}

export default function DrinkList({ drinks, isLoading, searchQuery }: DrinkListProps) {
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>Searching drinks...</p>
      </div>
    );
  }

  if (!searchQuery) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🍹</div>
        <h2>Find Your Perfect Drink</h2>
        <p>Start typing to search for cocktail recipes</p>
      </div>
    );
  }

  if (drinks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h2>No drinks found</h2>
        <p>Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="drink-list">
      {drinks.map((drink) => (
        <DrinkListItem key={drink.idDrink} drink={drink} />
      ))}
    </div>
  );
}

