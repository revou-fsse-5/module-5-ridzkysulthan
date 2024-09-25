import { GetStaticProps } from 'next';
import { fetchCategories } from '../src/api';

interface Category {
  id: number;
  name: string;
  image: string;
}

interface CategoriesPageProps {
  categories: Category[];
}

const CategoriesPage = ({ categories }: CategoriesPageProps) => {
  return (
    <div>
      <h1>Categories</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {categories.map((category) => (
          <div key={category.id} style={{ border: '1px solid #ddd', padding: '20px' }}>
            <img src={category.image} alt={category.name} style={{ width: '100%' }} />
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await fetchCategories();
  return {
    props: {
      categories,
    },
  };
};

export default CategoriesPage;
