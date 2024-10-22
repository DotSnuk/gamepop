import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartModal from './CartModal';
import * as App from '../../app/App';
import { Car } from 'lucide-react';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

it('empty cart says cart is empty', () => {
  const mockCart = [];
  vi.spyOn(App, 'useCartContext').mockReturnValue({ cart: mockCart });
  render(<CartModal />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /your cart is empty/i,
  );
});

it('one item in cart shows item name', () => {
  const mockCart = [{ game: { name: 'GTA', id: 1, price: 75 }, amount: 1 }];
  vi.spyOn(App, 'useCartContext').mockReturnValue({ cart: mockCart });

  render(<CartModal />);
  expect(screen.getByText(/gta/i)).toBeInTheDocument();
});
