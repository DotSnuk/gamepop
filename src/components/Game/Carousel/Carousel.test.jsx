import { it, expect, vi } from 'vitest';
import { screen, render, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import * as api from '../../../api/api';
import Carousel from './Carousel';

it('image is rendered', async () => {
  const urls = [
    { id: 1, image: 'www.jpg.jpg' },
    { id: 2, image: 'www.jpg2.jpg' },
  ];
  vi.spyOn(api, 'getScreenshots').mockResolvedValue(urls);

  await act(async () => {
    render(
      <MemoryRouter initialEntries={[`/game/Grand-Theft-Auto-V`]}>
        <Routes>
          <Route path={'/game/:id'} element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
  });

  const img = await screen.findByRole('img', { name: 'main' });

  expect(img).toHaveAttribute('src', urls[0]);
});
