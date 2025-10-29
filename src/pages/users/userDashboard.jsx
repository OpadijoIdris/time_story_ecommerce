import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import UserNav from './UserNav';
import AllProducts from './AllProducts';
import Cart from './Cart';
import { getAllProducts, getCartById, clearCart } from '../../../api.js';
import { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect admin users
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.role === 'admin') navigate('/admin');
  }, [navigate]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch {
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch user cart
  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?._id) return;
      const data = await getCartById(user._id);
      setCart(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Failed to fetch cart');
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClearCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?._id) {
        await clearCart(user._id);
        setCart([]);
      }
    } catch {
      setError('Failed to clear cart');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <UserNav cart={cart} fetchCart={fetchCart} onLogout={handleLogout} />

      <main className="flex-grow p-8">
        {isLoading ? (
          <p className="text-gray-500 text-center py-10">Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-10">{error}</p>
        ) : (
          <Routes>
            <Route
              path="products"
              element={<AllProducts products={products} cart={cart} setCart={setCart} fetchCart={fetchCart} />}
            />
            <Route
              path="cart"
              element={<Cart cart={cart} handleClearCart={handleClearCart} />}
            />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
