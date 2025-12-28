import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">🍸</div>
        <h1>Drink Not Found</h1>
        <p>Sorry, we couldn&apos;t find that cocktail.</p>
        <Link href="/" className="back-home-button">
          Back to Search
        </Link>
      </div>
    </div>
  );
}

