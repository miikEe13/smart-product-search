import { useState, useEffect } from 'react';

export const useProductSearch = (initialUrl) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

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

  const search = (input) => {
    setQuery(input);
    if (input.trim() === '') {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase()) ||
      product.description.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return {
    query,
    search,
    products,
    filteredProducts,
    loading
  };
};
