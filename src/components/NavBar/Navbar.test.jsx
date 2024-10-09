import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from '../../app/routes';
import userEvent from '@testing-library/user-event';

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

it('clicking on home brings you to home', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);
  await user.click(screen.getByRole('link', { name: /home/i }));

  expect(
    screen.getByRole('heading', { level: 1, name: /popular/i }),
  ).toBeInTheDocument();
});
