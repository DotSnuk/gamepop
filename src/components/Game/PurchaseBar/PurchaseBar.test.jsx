import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PurchaseBar from './PurchaseBar';

function getMockedGame() {
  const mockGame = {
    name: 'Grand Theft Auto V',
    background_image: 'gta-v-image.jpg',
    description: 'Best-selling action-adventure game',
    developers: [{ id: 1, name: 'Rockstar Games' }],
    price: 75,
  };

  return mockGame;
}

it('button shows price', () => {
  const game = getMockedGame();
  render(<PurchaseBar game={game} />);

  expect(screen.getByRole('button')).toHaveTextContent(game.price);
});
