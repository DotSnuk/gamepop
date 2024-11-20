import { it, expect, vi, afterEach } from 'vitest';
import { screen, render, act, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import * as api from '../../../api/api';
import Carousel from './Carousel';

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

function setup() {
  const urls = [
    { id: 1, image: 'www.jpg.jpg' },
    { id: 2, image: 'www.jpg2.jpg' },
  ];
  vi.spyOn(api, 'getScreenshots').mockResolvedValue(urls);

  return urls;
}

async function renderWithRouter() {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={[`/game/Grand-Theft-Auto-V`]}>
        <Routes>
          <Route path={'/game/:id'} element={<Carousel />} />
        </Routes>
      </MemoryRouter>,
    );
  });
}

it('image is rendered', async () => {
  const urls = setup();

  await renderWithRouter();

  // await act(async () => {
  //   render(
  //     <MemoryRouter initialEntries={[`/game/Grand-Theft-Auto-V`]}>
  //       <Routes>
  //         <Route path={'/game/:id'} element={<Carousel />} />
  //       </Routes>
  //     </MemoryRouter>,
  //   );
  // });

  const imgs = screen.getAllByRole('img', { hidden: true });
  imgs.forEach(img => fireEvent.load(img));

  expect(screen.getByRole('img', { name: 'main' })).toHaveAttribute(
    'src',
    urls[0].image,
  );
});

it('main image changes when user click image in row', async () => {
  const urls = setup();
  await renderWithRouter();
  const user = userEvent.setup();

  const imgs = screen.getAllByRole('img', { hidden: true });
  imgs.forEach(img => fireEvent.load(img));

  const mainImage = screen.getByAltText('main');
  const rowImages = screen.getAllByAltText('row');

  const mainSrc = mainImage.getAttribute('src');
  const rowSrc = rowImages[1].getAttribute('src');

  expect(rowSrc).not.toEqual(mainSrc);

  await user.click(rowImages[1]);
  const newMain = screen.getByAltText('main');
  const newMainSrc = newMain.getAttribute('src');

  expect(rowSrc).toEqual(newMainSrc);
});
