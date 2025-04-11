'use client';

import SearchBar from '../components/SearchBar';
import RecommendationsList from '../components/RecommendationsList';
import { useProductSearch } from '../hooks/useProductSearch';

export default function Home() {
  const {
    query,
    search,
    filteredProducts,
    loading,
    searching
  } = useProductSearch('https://dummyjson.com/products?limit=120');

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🧠 Smart Product Search
      </h1>

      <SearchBar onSearch={search} />

      {loading ? (
        <p className="text-center text-gray-500 mt-8">Loading products...</p>
      ) : searching ? (
        <p className="text-center text-blue-500 mt-8 animate-pulse">Thinking...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">No products found.</p>
      ) : (
        <RecommendationsList products={filteredProducts} />
      )}
    </main>
  );
}
