import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameGrid from './GameGrid';
import { MemoryRouter } from 'react-router-dom';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

vi.mock('../GridItem/GridItem', () => ({
  default: props => {
    return (
      <div>
        <h2>{props.game.name}</h2>
      </div>
    );
  },
}));

it('Show 10 games', () => {
  const games = [];
  for (let i = 0; i < 10; i++) {
    games.push({ name: `GTA${i}`, id: i });
  }

  render(
    <MemoryRouter>
      <GameGrid games={games} />
    </MemoryRouter>,
  );

  expect(screen.getAllByRole('heading', { level: 2 })[9]).toHaveTextContent(
    /gta9/i,
  );
});
