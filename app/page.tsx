'use client';

import { useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSearchCocktails } from './hooks/useCocktails';
import SearchBar from './components/SearchBar';
import DrinkList from './components/DrinkList';

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Use React Query for search - automatically handles caching, loading, errors
  const { 
    data: drinks = [], 
    isLoading,
    isFetching,
  } = useSearchCocktails(searchQuery);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    // Update URL without adding to history stack
    const newUrl = query.trim() ? `?q=${encodeURIComponent(query)}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [router]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <span className="title-icon">🍹</span>
          Thirsty
        </h1>
        <p className="app-subtitle">Find your perfect cocktail</p>
      </header>
      
      <SearchBar onSearch={handleSearch} initialValue={initialQuery} />
      
      <main className="main-content">
        <DrinkList 
          drinks={drinks} 
          isLoading={isLoading || isFetching} 
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function Home() {
  return (
    <Suspense fallback={
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="title-icon">🍹</span>
            Thirsty
          </h1>
          <p className="app-subtitle">Find your perfect cocktail</p>
        </header>
        <div className="loading-container">
          <div className="loading-spinner" />
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
