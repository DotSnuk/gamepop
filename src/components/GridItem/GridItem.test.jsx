import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../app/routes';
import userEvent from '@testing-library/user-event';
import GridItem from './GridItem';
import img from '../../assets/placeholder_300x300.png';

it('display game name', () => {
  const game = { name: 'GTA' };

  render(<GridItem game={game} />);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/gta/i);
});

it('shows image', () => {
  const game = { name: 'GTA', background_image: img };

  render(<GridItem game={game} />);

  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    expect.stringMatching(/png$/),
  );
});
