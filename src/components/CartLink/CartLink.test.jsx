import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as App from '../../app/App';
import userEvent from '@testing-library/user-event';
import CartLink from './CartLink';
import * as CartContextProvider from '../CartContextProvider/CartContextProvider';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

it('show 0 with empty cart', () => {
  const mockCart = [];
  vi.spyOn(CartContextProvider, 'useCartContext').mockReturnValue({
    cart: mockCart,
  });

  render(<CartLink />);
  expect(screen.getByRole('button', { name: 'cart' })).toHaveTextContent('0');
});

it('shows 1 with cart with one item', () => {
  const mockCart = ['item'];
  vi.spyOn(CartContextProvider, 'useCartContext').mockReturnValue({
    cart: mockCart,
  });

  render(<CartLink />);
  expect(screen.getByRole('button', { name: 'cart' })).toHaveTextContent('1');
});

it('callback function called is called', async () => {
  const user = userEvent.setup();
  const mockCart = ['item'];
  const mockFunction = vi.fn();
  vi.spyOn(CartContextProvider, 'useCartContext').mockReturnValue({
    cart: mockCart,
    openCart: mockFunction,
  });

  render(<CartLink openModal={mockFunction} />);
  const button = screen.getByRole('button', { name: 'cart' });
  await user.click(button);

  expect(mockFunction).toHaveBeenCalled();
});
