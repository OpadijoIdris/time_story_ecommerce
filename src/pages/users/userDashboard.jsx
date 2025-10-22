import { Routes, Route, useNavigate } from 'react-router-dom';
import UserNav from './userNav';
import AllProducts from './allProducts';
import { getAllProducts } from '../../../api.js';
import { useState, useEffect } from 'react';
// import AdminRoutes from '../admin/AdminRoutes';

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <UserNav cart={cart} />
      <main className="flex-grow p-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        {isLoading ? (
          <p className="text-gray-500 text-center py-10">Loading products...</p>
        ) : error ? (
          <p className="text-red-500 text-center py-10">{error}</p>
        ) : (
          <Routes>
            <Route path="/products" element={<AllProducts products={products} cart={cart} setCart={setCart} />} />
            <Route path="/cart" element={<AllProducts products={products} cart={cart} setCart={setCart} />} />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;
