import ProductCard from "./ProductCard";

export default function RecommendationsList({ products }) {

    console.log(products)
  if (!products || products.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No products to display.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}