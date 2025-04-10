export default function ProductCard({ product }) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
          <p className="text-gray-600 text-sm mt-1">{product.description}</p>
          <p className="text-blue-600 font-bold text-lg mt-3">${product.price}</p>
        </div>
      </div>
    );
  }
  