import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartLink from './CartLink';

it('show 0 with empty cart', () => {
  const cart = [];
  const callbackFunction = vi.fn();

  render(<CartLink openCart={callbackFunction} cart={cart} />);
  expect(screen.getByRole('button', { name: 'cart' })).toHaveTextContent('0');
});

it('shows 1 with cart with one item', () => {
  const cart = ['asd'];
  const callbackFunction = vi.fn();

  render(<CartLink openCart={callbackFunction} cart={cart} />);
  expect(screen.getByRole('button', { name: 'cart' })).toHaveTextContent('1');
});

it('callback function called is called', async () => {
  const user = userEvent.setup();
  const cart = [];
  const callbackFunction = vi.fn();

  render(<CartLink openCart={callbackFunction} cart={cart} />);
  const button = screen.getByRole('button', { name: 'cart' });
  await user.click(button);

  expect(callbackFunction).toHaveBeenCalled();
});
