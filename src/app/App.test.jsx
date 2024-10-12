import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { routes } from './routes';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

// it('shows 0 games in cart', () => {
//   const router = createMemoryRouter(routes, {
//     initialEntries: ['/'],
//   });

//   render(<RouterProvider router={router} />);

//   const button = screen.getByRole('button', { name: 'cart' });
//   expect(button).toHaveTextContent(/\d/);
// });

// it('shows 1 games in cart after click', async () => {
//   const user = userEvent.setup();
//   const router = createMemoryRouter(routes, {
//     initialEntries: ['/'],
//   });

//   await act(async () => {
//     render(<RouterProvider router={router} />);
//     await user.click(screen.getByRole('link', { name: 'add' }));
//   });
//   const button = screen.getByRole('button', { name: 'cart' });

//   expect(button).toHaveTextContent('1');
// });

it('placeholder', () => {});
