import { useState, useEffect } from 'react';

export const useProductSearch = (initialUrl) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false); // optional loading for search

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(initialUrl);
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialUrl]);

  const search = async (input) => {
    setQuery(input);

    if (input.trim() === '') {
      setFilteredProducts(products);
      return;
    }

    setSearching(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: input,
          products
        })
      });

      const data = await res.json();

      if (data.results) {
        const matched = products
          .map((product) => {
            const match = data.results.find((r) => r.title === product.title);
            return match
              ? { ...product, reason: match.reason }
              : null;
          })
          .filter(Boolean)
          //.sort((a, b) => b.rating - a.rating); // sorted by rating descending

        setFilteredProducts(matched);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error('AI search failed:', error);
      setFilteredProducts([]);
    } finally {
      setSearching(false);
    }
  };

  return {
    query,
    search,
    products,
    filteredProducts,
    loading,
    searching
  };
};
