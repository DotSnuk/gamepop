import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from './routes';
import userEvent from '@testing-library/user-event';

it('clicking cart brings up modal', async () => {
  const user = userEvent.setup();
  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  render(<RouterProvider router={router} />);

  await user.click(screen.getByLabelText('cart'));

  expect(screen.getByRole('heading', /your cart/i)).toBeVisible();
});
