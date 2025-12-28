import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import IngredientLegend from '../app/components/IngredientLegend';
import '../app/globals.css';

const meta: Meta<typeof IngredientLegend> = {
  title: 'Components/IngredientLegend',
  component: IngredientLegend,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IngredientLegend>;

// Sample ingredients for stories
const margaritaIngredients = [
  { name: 'Tequila', originalMeasure: '1 1/2 oz', amount: 1.5, color: 'hsl(0, 70%, 75%)' },
  { name: 'Triple sec', originalMeasure: '1/2 oz', amount: 0.5, color: 'hsl(137, 70%, 75%)' },
  { name: 'Lime juice', originalMeasure: '1 oz', amount: 1, color: 'hsl(275, 70%, 75%)' },
  { name: 'Salt', originalMeasure: '', amount: 0, color: 'hsl(52, 70%, 75%)' },
];

const mojitoIngredients = [
  { name: 'White Rum', originalMeasure: '2 oz', amount: 2, color: 'hsl(45, 70%, 75%)' },
  { name: 'Lime Juice', originalMeasure: '1 oz', amount: 1, color: 'hsl(120, 70%, 75%)' },
  { name: 'Sugar', originalMeasure: '2 tsp', amount: 0.33, color: 'hsl(200, 70%, 75%)' },
  { name: 'Soda Water', originalMeasure: '4 oz', amount: 4, color: 'hsl(280, 70%, 75%)' },
  { name: 'Mint', originalMeasure: '6 leaves', amount: 0, color: 'hsl(160, 70%, 75%)' },
];

const singleIngredient = [
  { name: 'Neat Whiskey', originalMeasure: '2 oz', amount: 2, color: 'hsl(30, 70%, 75%)' },
];

/**
 * Default legend showing Margarita ingredients
 */
export const Default: Story = {
  args: {
    ingredients: margaritaIngredients,
  },
};

/**
 * Legend with many ingredients (Mojito)
 */
export const ManyIngredients: Story = {
  args: {
    ingredients: mojitoIngredients,
  },
};

/**
 * Legend with a single ingredient
 */
export const SingleIngredient: Story = {
  args: {
    ingredients: singleIngredient,
  },
};

/**
 * Shows ingredients without measurements (like garnishes)
 */
export const NoMeasurements: Story = {
  args: {
    ingredients: [
      { name: 'Salt rim', originalMeasure: '', amount: 0, color: 'hsl(52, 70%, 75%)' },
      { name: 'Lime wedge', originalMeasure: '', amount: 0, color: 'hsl(120, 70%, 75%)' },
      { name: 'Mint sprig', originalMeasure: '', amount: 0, color: 'hsl(160, 70%, 75%)' },
    ],
  },
};

/**
 * Empty state with no ingredients
 */
export const Empty: Story = {
  args: {
    ingredients: [],
  },
};

