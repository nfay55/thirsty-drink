'use client';

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Cocktail } from '../types/cocktail';
import { cocktailKeys } from '../hooks/useCocktails';
import { getCocktailById } from '../lib/api';

interface DrinkListItemProps {
  drink: Cocktail;
}

export default function DrinkListItem({ drink }: DrinkListItemProps) {
  const queryClient = useQueryClient();

  // Prefetch cocktail details on hover for instant navigation
  const handleMouseEnter = useCallback(() => {
    queryClient.prefetchQuery({
      queryKey: cocktailKeys.detail(drink.idDrink),
      queryFn: () => getCocktailById(drink.idDrink),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  }, [queryClient, drink.idDrink]);

  return (
    <Link 
      href={`/drink/${drink.idDrink}`} 
      className="drink-list-item"
      onMouseEnter={handleMouseEnter}
    >
      <div className="drink-image-container">
        <Image
          src={drink.strDrinkThumb}
          alt={drink.strDrink}
          width={40}
          height={40}
          className="drink-image"
        />
      </div>
      <span className="drink-name">{drink.strDrink}</span>
      <svg
        className="chevron-icon"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  );
}
