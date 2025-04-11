import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    title: 'MacBook Pro',
    price: 1999,
    reason: 'Great for video editing and performance',
    thumbnail: 'https://dummyimage.com/600x400',
    rating: 4.9
  };

  it('renders the product title, price and reason', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(/macbook pro/i)).toBeInTheDocument();
    expect(screen.getByText('$1999')).toBeInTheDocument();
    expect(screen.getByText(/video editing/i)).toBeInTheDocument();
  });

  it('renders the product image', () => {
    render(<ProductCard product={mockProduct} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockProduct.thumbnail);
    expect(img).toHaveAttribute('alt', mockProduct.title);
  });
});
