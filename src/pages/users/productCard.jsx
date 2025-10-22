export default function ProductCard({ product, onAddToCart, onProductClick }) {
  if (!product) return null; // safety check to prevent crashing

  return (
    <div 
      className="border rounded-2xl shadow-md p-4 hover:shadow-lg transition-all cursor-pointer"
      onClick={() => onProductClick(product)}
    >
      <img
        src={product.images?.[0] || "/placeholder.jpg"}
        alt={product.name}
        className="w-full h-48 object-contain rounded-xl mb-3"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm">{product.description}</p>
      <p className="mt-2 font-bold text-gray-900">₦{product.price}</p>

      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent the modal from opening when clicking the button
          onAddToCart(product);
        }}
        className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        Add to Cart
      </button>
    </div>
  );
}
