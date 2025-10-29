import { useState } from 'react';
import { addToCart as addToCartApi } from '../../../api.js';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';

const AllProducts = ({ products, cart, setCart, fetchCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await addToCartApi({ productId, quantity });
      await fetchCart(); // refresh cart
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleProductClick = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 flex flex-col">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover mb-4 cursor-pointer"
              onClick={() => handleProductClick(product)}
            />
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-bold mt-2">₦{product.price}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
            <div className="flex items-center mt-4">
              <input
                type="number"
                min="1"
                max={product.stock}
                defaultValue="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 border-gray-300 border rounded-md p-2 text-center"
              />
              <button
                onClick={() => addToCart(product._id, quantity)}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-4 hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default AllProducts;
