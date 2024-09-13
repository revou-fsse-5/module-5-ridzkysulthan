import { fetchProducts } from 'https://api.escuelajs.co/api/v1';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Product 1' }]),
  })
) as jest.Mock;

describe('API Service', () => {
  it('fetches products successfully', async () => {
    const products = await fetchProducts();
    expect(products).toEqual([{ id: 1, name: 'Product 1' }]);
  });

  it('handles API errors', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject('API is down')
    );
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toBe('API is down');
    }
  });
});