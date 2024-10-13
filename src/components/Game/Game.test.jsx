import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Game from './Game';

it('', () => {
  render(
    <MemoryRouter initialEntries={['/game/grand-theft-auto-v']}>
      <Routes>
        <Route path={'/game/:id'} element={<Game />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
    'grand-theft-auto-v',
  );
});
