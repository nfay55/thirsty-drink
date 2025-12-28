'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Cocktail, ParsedIngredient } from '../../types/cocktail';
import { cocktailKeys } from '../../hooks/useCocktails';
import IngredientLegend from '../../components/IngredientLegend';
import PieChart from '../../components/PieChart';

interface DrinkDetailClientProps {
  cocktail: Cocktail;
  allIngredients: ParsedIngredient[];
  chartIngredients: ParsedIngredient[];
}

export default function DrinkDetailClient({
  cocktail,
  allIngredients,
  chartIngredients,
}: DrinkDetailClientProps) {
  const queryClient = useQueryClient();

  // Hydrate React Query cache with server-fetched data
  // This ensures subsequent client-side navigations use the cached data
  useEffect(() => {
    queryClient.setQueryData(cocktailKeys.detail(cocktail.idDrink), cocktail);
  }, [queryClient, cocktail]);

  return (
    <div className="detail-container">
      {/* Header with back button and drink name */}
      <header className="detail-header">
        <Link href="/" className="back-link">
          <span className="back-chevron">‹</span>
          <span className="back-text">Thirsty</span>
        </Link>
        <span className="header-title">{cocktail.strDrink}</span>
      </header>

      <main className="detail-content">
        {/* 1. Image View: Top margin 30, Horizontally centered, Circular */}
        <div className="drink-image-section">
          <div className="drink-detail-image-container">
            <Image
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              width={150}
              height={150}
              className="drink-detail-image"
              priority
            />
          </div>
        </div>

        {/* 2. Name: Font size 20, Bold, Top margin 20, Horizontally centered */}
        <h1 className="drink-detail-name">{cocktail.strDrink}</h1>

        {/* 3. Ingredients label: Left 20, Top 30, Bottom 20, Font 17, Bold */}
        <h2 className="ingredients-label">Ingredients:</h2>

        {/* 4. Legend + 5. Pie Chart side by side */}
        <div className="ingredients-chart-container">
          {/* 4. Legend: Font 17, Margins 20, Color squares 20x20 radius 3 */}
          <IngredientLegend ingredients={allIngredients} />
          
          {/* 5. Pie chart: Margins 20, Size 120 */}
          {chartIngredients.length > 0 && (
            <div className="pie-chart-wrapper">
              <PieChart ingredients={chartIngredients} size={120} />
            </div>
          )}
        </div>

        {/* 6. Instructions: Left/Right 20, Top 30, Bottom 20, Font 17 */}
        <p className="instructions-text">{cocktail.strInstructions}</p>
      </main>
    </div>
  );
}
