// src/components/CartPopup.jsx
import { motion, AnimatePresence } from "framer-motion"; 

const CartPopup = ({ cartCount, showPopup }) => {
  return (
    <div className="fixed top-5 right-5 z-50">
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg"
          >
            ✅ Added to Cart! ({cartCount})
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPopup;
