import GridInfo from './GridInfo';
import { it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

it('displays price', () => {
  const mockFunc = vi.fn();
  const game = { name: 'GTA', price: 75 };

  render(<GridInfo dispatch={mockFunc} game={game} />);

  expect(screen.getByText(/75/i)).toBeInTheDocument();
});

// it('clicking plus runs function', async () => {
//   const mockFunc = vi.fn();
//   const spy = vi.spyOn(mockFunc);
//   const game = { name: 'GTA', price: 75 };
//   const user = userEvent.setup();

//   const button = screen.getByRole('link');

//   render(<GridInfo dispatch={mockFunc} game={game} />);
//   await act(async () => {});
// });
