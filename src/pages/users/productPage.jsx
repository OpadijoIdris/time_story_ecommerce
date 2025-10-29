// src/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllProducts } from "../../../api.js";
import ProductCard from "./productCard.jsx";
import ProductModal from "./ProductModal.jsx";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setShowPopup(true);

    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <CartPopup cartCount={cart.length} showPopup={showPopup} />

      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>

      <motion.div 
        className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <motion.div key={product._id} variants={itemVariants}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">
            Loading products...
          </p>
        )}
      </motion.div>

      {/* Cart counter at top right corner */}
      <div className="fixed top-5 right-5 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
        {cart.length}
      </div>

      {selectedProduct && <ProductModal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default ProductsPage;


