import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for authentication

const Header = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">EasyShop</Link>
        </h1>
        <nav className="flex items-center space-x-4">
          <Link href="/cart" className="relative hover:bg-blue-700 transition duration-300 px-3 py-2 rounded" aria-label="Go to cart">
            Cart
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-blue-600 bg-white border border-blue-600 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <span className="hover:bg-blue-700 transition duration-300 px-3 py-2 rounded cursor-pointer" onClick={logout}>
                Logout
              </span>
            </>
          ) : (
            <Link href="/login" className="hover:bg-blue-700 transition duration-300 px-3 py-2 rounded" aria-label="Login to your account">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;