import { useCart } from '../src/context/CartContext';
import { useRouter } from 'next/router'; 
import { useAuth } from '../src/context/AuthContext'; 

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth(); 
  const router = useRouter(); 

  const handleRemove = (id: number) => {
    removeFromCart(id);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const handleIncreaseQuantity = (id: number) => {
    updateQuantity(id, 1);
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, -1);
    } else {
      handleRemove(id); 
    }
  };

  const handleCheckout = () => {
    if (!user) { 
      router.push('/login'); 
    } else {
      router.push('/checkout'); 
    }
  };

  console.log('Cart Items:', cartItems);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <span className="text-blue-600 cursor-pointer" onClick={() => router.push('/')}>Go shopping!</span></p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center border-b py-4">
                <img
                  src={item.image || '/fallback-image.png'} 
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="bg-gray-300 text-gray-700 py-1 px-2 rounded-l hover:bg-gray-400 transition duration-300"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="bg-gray-300 text-gray-700 py-1 px-2 rounded-r hover:bg-gray-400 transition duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-600 hover:text-red-800 transition duration-300 ml-4"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClearCart}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
          >
            Clear Cart
          </button>

          <button
            onClick={handleCheckout}
            className={`mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={cartItems.length === 0} 
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
