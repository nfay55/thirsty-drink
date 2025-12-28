# 🍹 Thirsty - Cocktail Finder

A beautiful cocktail recipe finder app built with Next.js and TypeScript. Search for cocktails by name and view detailed recipes with ingredient measurements displayed in an interactive pie chart.

### Deployed URL: https://thirsty-drink.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![React Query](https://img.shields.io/badge/React_Query-5-ff4154)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4)

## ✨ Features

- 🔍 **Real-time Search** - Search cocktails by name with debounced input
- 🔗 **URL-based Search** - Search query persists in URL for sharing and page refresh
- 📋 **Detailed Recipes** - View full ingredient lists and instructions
- 🥧 **Pie Chart Visualization** - See ingredient ratios in an interactive chart
- 🎨 **Color-coded Ingredients** - Each ingredient has a unique pastel color
- ⚡ **Smart Caching** - React Query caches results for instant repeat searches
- 🚀 **Prefetching** - Hover over drinks to prefetch details for instant navigation
- 📱 **Mobile-first Design** - Responsive layout optimized for all devices
- 🖥️ **Server-Side Rendering** - Detail pages are SSR for fast initial load

## 🚀 Getting Started

### Prerequisites

- Node.js 22+ (see `.nvmrc`)
- npm or yarn
- [nvm](https://github.com/nvm-sh/nvm) (recommended for Node version management)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nfay55/thirsty-drink.git
cd thirsty-drink
```

2. Set up the correct Node version (using nvm):
```bash
nvm install    # Installs Node version from .nvmrc
nvm use        # Switches to the correct version
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Testing

Run unit tests with Jest:

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
```

The test suite includes 29 tests covering:
- `parseMeasure` - Unit conversion for various measurement formats
- `generatePastelColor` - Color generation for ingredients
- `extractIngredients` - Ingredient extraction from API data
- `getChartableIngredients` - Filtering ingredients for pie chart

## 📖 Storybook

View and interact with components in isolation:

```bash
npm run storybook     # Start Storybook at http://localhost:6006
```

Stories are available for:
- **PieChart** - Various states including single/multiple ingredients, empty states
- **IngredientLegend** - Different ingredient lists and configurations
- **SearchBar** - Empty, populated, and interactive states

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **State Management**: React Query (TanStack Query)
- **Styling**: Tailwind CSS + Custom CSS
- **Testing**: Jest + React Testing Library
- **Component Development**: Storybook 10
- **API**: [TheCocktailDB](https://www.thecocktaildb.com/api.php)

## 📁 Project Structure

```
app/
├── components/          # Reusable React components
│   ├── SearchBar.tsx    # Search input with debounce
│   ├── DrinkList.tsx    # List of drink results
│   ├── DrinkListItem.tsx # Individual drink card with prefetch
│   ├── PieChart.tsx     # SVG pie chart for ingredients
│   └── IngredientLegend.tsx # Color-coded ingredient list
├── drink/[id]/          # Dynamic drink detail page
│   ├── page.tsx         # Server component (SSR)
│   ├── DrinkDetailClient.tsx # Client component
│   └── not-found.tsx    # 404 page
├── hooks/               # Custom React hooks
│   └── useCocktails.ts  # React Query hooks for API
├── lib/                 # Utility functions
│   ├── api.ts           # API calls to TheCocktailDB
│   └── ingredients.ts   # Ingredient parsing & conversion
├── providers/           # React context providers
│   └── QueryProvider.tsx # React Query provider
├── types/               # TypeScript type definitions
│   └── cocktail.ts      # Cocktail API types
├── globals.css          # Global styles
├── layout.tsx           # Root layout
└── page.tsx             # Home page
```

## 🎯 Implementation Highlights

### React Query Integration

Smart caching and prefetching for optimal UX:

```typescript
// Search results cached for 5 minutes
const { data: drinks, isLoading } = useSearchCocktails(query);

// Prefetch on hover for instant navigation
const handleMouseEnter = () => {
  queryClient.prefetchQuery({
    queryKey: cocktailKeys.detail(drink.idDrink),
    queryFn: () => getCocktailById(drink.idDrink),
  });
};
```

### URL-based Search

Search query syncs with URL for sharing and persistence:

```typescript
// URL updates as you search: /?q=margarita
const newUrl = query.trim() ? `?q=${encodeURIComponent(query)}` : '/';
router.replace(newUrl, { scroll: false });
```

### Ingredient Unit Conversion

The app converts various measurement units to a standard unit for accurate pie chart display:

```typescript
const CONVERSIONS = {
  'oz': 1,
  'cl': 0.33814,
  'ml': 0.033814,
  'tsp': 0.166667,
  'tbsp': 0.5,
  'cup': 8,
  'dash': 0.03125,
  'shot': 1.5,
  // ... more units
};
```

### Search with Debounce

Search results update as you type with a 300ms debounce to prevent excessive API calls:

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    onSearch(value);
  }, 300);
  return () => clearTimeout(timer);
}, [value, onSearch]);
```

## 🌐 API Reference

This app uses the free [TheCocktailDB API](https://www.thecocktaildb.com/api.php):

- **Search by name**: `GET /search.php?s={query}`
- **Lookup by ID**: `GET /lookup.php?i={id}`

No API key required!

## ⭐ Extra Credit Features

- ✅ **Unit Tests** - 29 comprehensive tests for helper functions using Jest
- ✅ **Storybook** - Component documentation and visual testing with Storybook 10
- ✅ **Pastel Colors** - Beautiful HSL-based pastel color generation for ingredients

## 📝 License

MIT License - feel free to use this project for learning or building upon.
