import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../app/routes';
import userEvent from '@testing-library/user-event';
import GridItem from './GridItem';

it('display game name', () => {
  const game = { name: 'GTA' };

  render(<GridItem game={game} />);

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/gta/i);
});
