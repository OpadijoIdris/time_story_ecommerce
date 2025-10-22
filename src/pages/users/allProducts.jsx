import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { addToCart as addToCartApi } from '../../../api.js';
import { useNavigate } from 'react-router-dom';
import ProductModal from './ProductModal';

const AllProducts = ({ products, cart, setCart }) => {
    const [showCartPopup, setShowCartPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    const addToCart = async (productId, quantity) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const product = products.find(p => p._id === productId);
        if (quantity > product.stock) {
            alert("Cannot add more than available stock");
            return;
        }

        try {
            await addToCartApi({ productId, quantity });
            setCart([...cart, { ...product, quantity }]);
            setShowCartPopup(true);
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const closeCartPopup = () => {
        setShowCartPopup(false);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleMakePayment = () => {
        // Navigate to a payment page or handle payment logic
        navigate('/payment');
    };

    const handleProductClick = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="border rounded-lg p-4 flex flex-col">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 cursor-pointer" onClick={() => handleProductClick(product)} />
                            <h2 className="text-xl font-semibold">{product.name}</h2>
                            <p className="text-gray-600">{product.description}</p>
                            <p className="text-lg font-bold mt-2">${product.price}</p>
                            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                            <div className="flex items-center mt-4">
                                <input type="number" min="1" max={product.stock} defaultValue="1" onChange={(e) => setQuantity(parseInt(e.target.value))} className="w-16 border-gray-300 border rounded-md p-2 text-center" />
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

                {showCartPopup && (
                    <div className="fixed top-4 right-4">
                        <div className="bg-white p-8 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
                            <ul>
                                {cart.map((item, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>{item.name} x{item.quantity}</span>
                                        <span>${item.price * item.quantity}</span>
                                    </li>
                                ))}
                            </ul>
                            <hr className="my-4" />
                            <div className="flex justify-between font-bold">
                                <span>Total:</span>
                                <span>${calculateTotal()}</span>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={closeCartPopup}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
                                >
                                    Continue Shopping
                                </button>
                                <button
                                    onClick={handleMakePayment}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Make Payment
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
        </div>
    );
};

export default AllProducts;