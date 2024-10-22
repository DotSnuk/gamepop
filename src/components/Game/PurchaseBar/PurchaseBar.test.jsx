import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PurchaseBar from './PurchaseBar';
import * as App from '../../../app/App';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

function mockContext() {
  const mockFunc = vi.fn();
  vi.spyOn(App, 'useCartContext').mockReturnValue({ dispatch: mockFunc });
  return mockFunc;
}

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
  const mockFunc = mockContext();

  render(<PurchaseBar game={game} />);

  expect(screen.getByRole('button')).toHaveTextContent(game.price);
});

it('clicking button runs function', async () => {
  const user = userEvent.setup();
  const game = getMockedGame();
  const mockFunc = vi.fn();

  vi.spyOn(App, 'useCartContext').mockReturnValue({ dispatch: mockFunc });

  render(<PurchaseBar game={game} />);
  const button = screen.getByRole('button');
  await user.click(button);

  expect(mockFunc).toHaveBeenCalled();
});
