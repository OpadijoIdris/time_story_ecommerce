const Cart = ({ cart, handleClearCart }) => {
  if (!cart) return <p>Loading cart...</p>;

  const items = Array.isArray(cart) ? cart : [];

  const totalPrice = items.reduce((sum, item) => {
    const price = item.product?.price || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-4">
                <img
                  src={item.product?.image || '/placeholder.jpg'}
                  alt={item.product?.name || 'Unnamed Product'}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.product?.name || 'Unnamed Product'}</h3>
                  <p className="text-sm text-gray-500">
                    ₦{item.product?.price?.toLocaleString() || 0} × {item.quantity}
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
            onClick={handleClearCart}
            className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
