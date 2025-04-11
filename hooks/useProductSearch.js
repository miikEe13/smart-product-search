import { useState, useEffect } from "react";

export const useProductSearch = (initialUrl) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false); // optional loading for search
  const [typingOutput, setTypingOutput] = useState("");
  const [isResponseComplete, setIsResponseComplete] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(initialUrl);
        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialUrl]);

  const search = async (input) => {
    setQuery(input);

    if (input.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    setSearching(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: input,
          products,
        }),
      });

      const data = await res.json();

      if (data.results) {
        const matched = products
          .map((product) => {
            const match = data.results.find((r) => r.title === product.title);
            return match ? { ...product, reason: match.reason } : null;
          })
          .filter(Boolean);

        setFilteredProducts(matched);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("AI search failed:", error);
      setFilteredProducts([]);
    } finally {
      setSearching(false);
    }
  };

  const searchWithStreaming = async (input) => {
    setQuery(input);
    setFilteredProducts([]);
    setTypingOutput("");
    setIsResponseComplete(false);

    if (input.trim() === "") {
      console.log("Empty input, resetting filtered products");
      setFilteredProducts(products);
      setSearching(false);
      return;
    }

    setSearching(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input, products, useStream: true }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value);
        fullText += chunk;
        setTypingOutput(fullText);
      }

      setIsResponseComplete(true);

      const parsed = JSON.parse(fullText)

      const matched = products
        .map((product) => {
          const match = parsed.find(
            (r) =>
              r.title.toLowerCase().includes(product.title.toLowerCase()) ||
              product.title.toLowerCase().includes(r.title.toLowerCase())
          );
          return match ? { ...product, reason: match.reason } : null;
        })
        .filter(Boolean)
        .slice(0, 5);

      setFilteredProducts(matched);
    } catch (error) {
      console.error("Streaming failed:", error);
      setFilteredProducts([]);
    } finally {
      setSearching(false);
    }
  };

  return {
    query,
    products,
    filteredProducts,
    loading,
    searching,
    typingOutput,
    isResponseComplete,
    searchWithStreaming,
  };
};
