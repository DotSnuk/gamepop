import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../app/routes';
import userEvent from '@testing-library/user-event';
import GameGrid from './GameGrid';

vi.mock('../GridItem/GridItem', () => ({
  default: props => {
    return (
      <div>
        <a href='#'>{props.game.name}</a>
      </div>
    );
  },
}));

it('Show 10 games', () => {
  const games = [];
  for (let i = 0; i < 10; i++) {
    games.push({ name: `GTA${i}`, id: i });
  }

  render(<GameGrid games={games} />);

  expect(screen.getAllByRole('link')[9]).toHaveTextContent(/gta9/i);
});
