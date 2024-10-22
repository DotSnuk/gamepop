import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import CartModal from './CartModal';
import * as App from '../../app/App';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

function mockSetup() {
  const mockCart = [];
  vi.spyOn(App, 'useCartContext').mockReturnValue({ cart: mockCart });
}

it('empty cart says cart is empty', () => {
  mockSetup();
  render(<CartModal />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /your cart is empty/i,
  );
});
