import { NavLink, useNavigate } from 'react-router-dom';

const UserNav = ({ cart, fetchCart, onLogout }) => {
  const navigate = useNavigate();

  const handleCartClick = async () => {
    await fetchCart();
    navigate('/dashboard/cart');
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-8">User Menu</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <NavLink
                to="/dashboard/products"
                className="flex items-center p-2 rounded hover:bg-gray-700"
              >
                Products
              </NavLink>
            </li>
            <li className="mb-4">
              <button
                onClick={handleCartClick}
                className="w-full text-left flex items-center p-2 rounded hover:bg-gray-700"
              >
                Cart
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Cart</h3>
          {cart.length === 0 ? (
            <p className="text-gray-400">Your cart is empty</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between items-center mb-2">
                  <span>{item.product?.name || 'Unnamed'}</span>
                  <span>x{item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        onClick={onLogout}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default UserNav;
