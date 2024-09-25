import { useEffect, useState } from 'react';
import { fetchProducts } from '../src/api/index';
import { useCart } from '../src/context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); 

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg shadow-lg p-4">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md mb-4" />
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
          <button
            onClick={() => addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 })}
            className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
