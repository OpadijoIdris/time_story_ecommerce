import { NavLink } from 'react-router-dom';

const UserNav = ({ cart }) => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-8">User Menu</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <NavLink to="/dashboard/products" className="flex items-center p-2 rounded hover:bg-gray-700">
              Products
            </NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/dashboard/cart" className="flex items-center p-2 rounded hover:bg-gray-700">
              Cart
            </NavLink>
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
                <span>{item.name}</span>
                <span>x{item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserNav;
