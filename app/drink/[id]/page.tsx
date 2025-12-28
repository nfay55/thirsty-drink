import { getCocktailById } from '../../lib/api';
import { extractIngredients, getChartableIngredients } from '../../lib/ingredients';
import DrinkDetailClient from './DrinkDetailClient';
import { notFound } from 'next/navigation';

interface DrinkPageProps {
  params: Promise<{ id: string }>;
}

export default async function DrinkPage({ params }: DrinkPageProps) {
  const { id } = await params;
  const cocktail = await getCocktailById(id);

  if (!cocktail) {
    notFound();
  }

  const allIngredients = extractIngredients(cocktail);
  const chartIngredients = getChartableIngredients(allIngredients);

  return (
    <DrinkDetailClient
      cocktail={cocktail}
      allIngredients={allIngredients}
      chartIngredients={chartIngredients}
    />
  );
}

