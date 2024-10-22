import { it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Game from './Game';
import { useEffect, useState } from 'react';
import * as api from '../../api/api';
import { act } from '@testing-library/react';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

vi.mock('./PurchaseBar/PurchaseBar', () => ({
  default: () => {
    return <div></div>;
  },
}));

function setupMock() {
  const mockGame = {
    name: 'Grand Theft Auto V',
    background_image: 'gta-v-image.jpg',
    description: 'Best-selling action-adventure game',
    developers: [{ id: 1, name: 'Rockstar Games' }],
    price: 75,
  };

  vi.spyOn(api, 'getGameWithId').mockResolvedValue(mockGame);

  return mockGame;
}

it('Game shows up', async () => {
  const game = setupMock();

  await act(async () => {
    render(
      <MemoryRouter initialEntries={[`/game/Grand-Theft-Auto-V`]}>
        <Routes>
          <Route path={'/game/:id'} element={<Game />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
    game.name,
  );
});

// it('buy button shows up', async () => {
//   const game = setupMock();

//   await act(async () => {
//     render(
//       <MemoryRouter initialEntries={[`/game/Grand-Theft-Auto-V`]}>
//         <Routes>
//           <Route path={'/game/:id'} element={<Game />} />
//         </Routes>
//       </MemoryRouter>,
//     );
//   });

//   expect(screen.getByRole('button')).toHaveTextContent(game.price);
// });
