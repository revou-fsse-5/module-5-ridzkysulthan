const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};

export const fetchProductById = async (id: number) => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return await response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return await response.json();
};

export const fetchCategoryById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/products/category/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch category');
  }
  return await response.json();
};