import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchProductById, fetchProducts } from '../../src/api';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

interface ProductPageProps {
  product: Product;
}

const ProductPage = ({ product }: ProductPageProps) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.images[0]} alt={product.title} style={{ width: '100%' }} />
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
};

// Mengambil ID produk untuk membangun halaman dinamis
export const getStaticPaths: GetStaticPaths = async () => {
  const products = await fetchProducts();
  const paths = products.map((product: Product) => ({
    params: { id: product.id.toString() },
  }));

  return { paths, fallback: false };
};

// Mengambil detail produk berdasarkan ID
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await fetchProductById(params?.id as string);
  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
