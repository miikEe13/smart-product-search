"use client";

import SearchBar from "../components/SearchBar";
import RecommendationsList from "../components/RecommendationsList";
import TypingResponse from "../components/TypingResponse";
import { useProductSearch } from "../hooks/useProductSearch";

export default function Home() {
  const {
    query,
    search,
    searchWithStreaming,
    filteredProducts,
    loading,
    searching,
    typingOutput,
    isResponseComplete
  } = useProductSearch("https://dummyjson.com/products?limit=120");

  return (
    <main className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🧠 Smart Product Search
      </h1>

      <SearchBar onSearch={searchWithStreaming} />

      {loading ? (
        <p className="text-center text-gray-500 mt-8">Loading products...</p>
      ) : searching ? (
        <div className="mt-6">
          <TypingResponse text={typingOutput} isComplete={isResponseComplete} />
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-400 mt-8">No products found.</p>
      ) : (
        <RecommendationsList products={filteredProducts} />
      )}
    </main>
  );
}
