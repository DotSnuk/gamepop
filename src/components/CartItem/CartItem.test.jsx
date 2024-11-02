import { it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartContextProvider from '../CartContextProvider/CartContextProvider';
import CartItem from './CartItem';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

function renderWithProvider(game) {
  return render(<CartContextProvider>{game}</CartContextProvider>);
}

it('game shows name and price', () => {
  const mockGame = { game: { id: 1, name: 'gta', price: 75 }, amount: 1 };

  renderWithProvider(<CartItem game={mockGame} />);

  expect(screen.getByText(/gta/i)).toBeInTheDocument();
  expect(screen.getByLabelText('price')).toHaveTextContent(75);
});
