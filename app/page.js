'use client';

import SearchBar from '../components/SearchBar';
import RecommendationsList from '../components/RecommendationsList';
import { useProductSearch } from '../hooks/useProductSearch';

export default function Home() {
  const {
    query,
    search,
    filteredProducts,
    loading
  } = useProductSearch('https://dummyjson.com/products?limit=20');

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🧠 Smart Product Search
      </h1>
      <SearchBar onSearch={search} />
      {loading ? (
        <p className="text-center text-gray-500 mt-8">Loading products...</p>
      ) : (
        <RecommendationsList products={filteredProducts} />
      )}
    </main>
  );
}
