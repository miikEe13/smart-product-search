import { notFound } from 'next/navigation';

export default async function ProductDetail({ params }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  if (!res.ok) return notFound();
  const product = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      <div>
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="w-full h-80 object-cover rounded"
        />
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {product.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Gallery ${i}`}
              className="w-20 h-20 object-cover rounded border"
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-700 mt-2">{product.description}</p>

        <div className="text-2xl text-blue-600 font-semibold mt-4">
          ${product.price}
        </div>

        <div className="mt-2 text-sm text-gray-600">
          Rating: <strong>{product.rating}</strong> / 5
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
          <p><strong>SKU:</strong> {product.sku}</p>
          <p><strong>Warranty:</strong> {product.warrantyInformation}</p>
          <p><strong>Shipping:</strong> {product.shippingInformation}</p>
          <p><strong>Status:</strong> {product.availabilityStatus}</p>
          <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <p><strong>Dimensions:</strong></p>
          <ul className="ml-4 list-disc">
            <li>Width: {product.dimensions?.width} cm</li>
            <li>Height: {product.dimensions?.height} cm</li>
            <li>Depth: {product.dimensions?.depth} cm</li>
          </ul>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <img src={product.meta?.qrCode} alt="QR code" className="w-20 h-20" />
          <p><strong>Barcode:</strong> {product.meta?.barcode}</p>
        </div>
      </div>

      <div className="col-span-full mt-8">
        <h2 className="text-xl font-semibold mb-2">Customer Reviews</h2>
        {product.reviews?.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, i) => (
              <div key={i} className="border p-4 rounded">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-sm text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400">
                  Rating: {review.rating} | {new Date(review.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
