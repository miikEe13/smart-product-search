'use client';

import Link from 'next/link';
import { StarIcon } from '@heroicons/react/24/solid';

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      tabIndex="0"
      aria-label={`Ver detalles de ${product.title}`}
    >
      <img
        src={product.thumbnail || product.images?.[0]}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>

        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(product.rating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">
              {product.rating.toFixed(1)} / 5
            </span>
          </div>
        )}

        <p className="text-blue-600 font-bold text-lg mt-3">${product.price}</p>

        {product.reason && (
          <p className="text-sm text-green-600 mt-2">
            💡 <strong>Reason:</strong> {product.reason}
          </p>
        )}
      </div>
    </Link>
  );
}
