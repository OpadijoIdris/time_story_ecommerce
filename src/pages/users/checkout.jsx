// src/pages/users/Checkout.jsx
import { useNavigate } from "react-router-dom";

const Checkout = ({ cart, handleClearCart }) => {
  const navigate = useNavigate();

  if (!cart || cart.length === 0) {
    return <p className="text-center mt-10">Your cart is empty.</p>;
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    alert("Order placed! Payment will be collected on delivery.");
    handleClearCart();
    navigate("/dashboard/products");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.product?.image || "/placeholder.jpg"}
                alt={item.product?.name || "Unnamed Product"}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-lg">
                  {item.product?.name || "Unnamed Product"}
                </h3>
                <p className="text-sm text-gray-500">
                  ₦{item.product?.price || 0} × {item.quantity}
                </p>
              </div>
            </div>
            <p className="font-bold text-green-700">
              ₦{(item.product?.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}

        <div className="mt-6 flex justify-between items-center font-semibold text-xl">
          <span>Total:</span>
          <span>₦{totalPrice.toLocaleString()}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Place Order (Pay on Delivery)
        </button>
      </div>
    </div>
  );
};

export default Checkout;
