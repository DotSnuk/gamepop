import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../app/App';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../app/routes';

it('renders correct heading', () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  expect(screen.getByRole('link', { name: /home/i })).toHaveTextContent(
    /home/i,
  );
  expect(screen.getByRole('link', { name: /browse/i })).toHaveTextContent(
    /browse/i,
  );
  // cart?
});
