import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from './routes';
import userEvent from '@testing-library/user-event';

it('shows 0 games in cart', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  const button = screen.getByRole('button', { name: 'cart' });
  expect(button).toHaveTextContent(/\d/);
});
