import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import PieChart from '../app/components/PieChart';
import '../app/globals.css';

const meta: Meta<typeof PieChart> = {
  title: 'Components/PieChart',
  component: PieChart,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 80, max: 300, step: 10 },
      description: 'Size of the pie chart in pixels',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PieChart>;

// Sample ingredients for stories
const margaritaIngredients = [
  { name: 'Tequila', originalMeasure: '1 1/2 oz', amount: 1.5, color: 'hsl(0, 70%, 75%)' },
  { name: 'Triple sec', originalMeasure: '1/2 oz', amount: 0.5, color: 'hsl(137, 70%, 75%)' },
  { name: 'Lime juice', originalMeasure: '1 oz', amount: 1, color: 'hsl(275, 70%, 75%)' },
];

const mojitoIngredients = [
  { name: 'White Rum', originalMeasure: '2 oz', amount: 2, color: 'hsl(45, 70%, 75%)' },
  { name: 'Lime Juice', originalMeasure: '1 oz', amount: 1, color: 'hsl(120, 70%, 75%)' },
  { name: 'Sugar', originalMeasure: '2 tsp', amount: 0.33, color: 'hsl(200, 70%, 75%)' },
  { name: 'Soda Water', originalMeasure: '4 oz', amount: 4, color: 'hsl(280, 70%, 75%)' },
  { name: 'Mint', originalMeasure: '6 leaves', amount: 0, color: 'hsl(160, 70%, 75%)' },
];

const singleIngredient = [
  { name: 'Whiskey', originalMeasure: '2 oz', amount: 2, color: 'hsl(30, 70%, 75%)' },
];

/**
 * Default pie chart showing a Margarita's ingredient ratios (spec: size 120)
 */
export const Default: Story = {
  args: {
    ingredients: margaritaIngredients,
    size: 120,
  },
};

/**
 * Larger pie chart for better visibility
 */
export const Large: Story = {
  args: {
    ingredients: margaritaIngredients,
    size: 200,
  },
};

/**
 * Small pie chart for compact displays
 */
export const Small: Story = {
  args: {
    ingredients: margaritaIngredients,
    size: 80,
  },
};

/**
 * Pie chart with more ingredients (Mojito)
 */
export const ManyIngredients: Story = {
  args: {
    ingredients: mojitoIngredients.filter(i => i.amount > 0),
    size: 120,
  },
};

/**
 * Pie chart with a single ingredient shows as full circle
 */
export const SingleIngredient: Story = {
  args: {
    ingredients: singleIngredient,
    size: 120,
  },
};

/**
 * Empty state when no measurable ingredients
 */
export const EmptyIngredients: Story = {
  args: {
    ingredients: [],
    size: 120,
  },
};

/**
 * Shows empty state for ingredients with zero amounts
 */
export const ZeroAmounts: Story = {
  args: {
    ingredients: [
      { name: 'Garnish', originalMeasure: '', amount: 0, color: 'hsl(0, 70%, 75%)' },
      { name: 'Ice', originalMeasure: '', amount: 0, color: 'hsl(200, 70%, 75%)' },
    ],
    size: 120,
  },
};

