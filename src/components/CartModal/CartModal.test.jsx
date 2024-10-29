import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartModal from './CartModal';
import userEvent from '@testing-library/user-event';
import * as CartContextProvider from '../CartContextProvider/CartContextProvider';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

it('empty cart says cart is empty', () => {
  const mockCart = [];
  vi.spyOn(CartContextProvider, 'useCartContext').mockReturnValue({
    cart: mockCart,
  });
  render(<CartModal />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /your cart is empty/i,
  );
});
