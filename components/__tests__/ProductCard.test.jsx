import { render, screen } from '@testing-library/react';
import ProductCard from '../ProductCard';

const mockProduct = {
  title: 'MacBook Pro',
  price: 1999,
  reason: 'Perfecto para edición de video y alto rendimiento',
  thumbnail: 'https://dummyimage.com/600x400',
  rating: 4.9
};

describe('ProductCard', () => {
  it('renders the product title, price, and reason', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/macbook pro/i)).toBeInTheDocument();
    expect(screen.getByText('$1999')).toBeInTheDocument();
    expect(screen.getByText(/edición de video/i)).toBeInTheDocument();
  });

  it('renders the product image with correct alt and src', () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', mockProduct.thumbnail);
    expect(image).toHaveAttribute('alt', mockProduct.title);
  });
});
