import { X } from 'lucide-react';

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
            
            <div className="text-sm text-gray-500">
              <p>Price: <span className="font-semibold text-blue-600 text-lg">${product.price}</span></p>
              <p>Stock: <span className="font-medium text-gray-700">{product.stock} units</span></p>
              <p className="mt-2">Date Uploaded: <span className="font-medium text-gray-700">{new Date(product.createdAt).toLocaleDateString()}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
