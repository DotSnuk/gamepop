import formatDate from '../utils/formatDate';
import { URL } from '../assets/constants';
const API_KEY = import.meta.env.VITE_RAWG_IO_KEY;

export async function getGames() {
  const games = await fetch(`${URL}games?key=${API_KEY}`, {
    mode: 'cors',
  }).then(response => {
    if (!response.ok) throw new Error('server error');
    return response.json();
  });
  return games.results;
}

export async function getPopularGames() {
  const today = new Date();
  const oneYearAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1),
  );
  const todayFormatted = formatDate(today);
  const oneYearAgoFormatted = formatDate(oneYearAgo);
  const searchDate = `dates=${oneYearAgoFormatted},${todayFormatted}`;
  const searchRating = `ordering=-rating`;
  const searchSize = `page_size=12`;
  const games = await fetch(
    `${URL}games?key=${API_KEY}&${searchDate}&${searchRating}&${searchSize}`,
    {
      mode: 'cors',
    },
  ).then(response => {
    if (!response.ok) throw new Error('server error');
    return response.json();
  });
  return games.results;
}

export async function getGameWithId(id) {
  const game = await fetch(`${URL}games/${id}?key=${API_KEY}`, {
    mode: 'cors',
  }).then(response => {
    if (!response.ok) throw new Error('server error');
    return response.json();
  });

  return game;
}

export async function getScreenshots(id) {
  const screenshots = await fetch(
    `${URL}games/${id}/screenshots?key=${API_KEY}`,
    {
      mode: 'cors',
    },
  ).then(response => {
    if (!response.ok) throw new Error('server error');
    return response.json();
  });
  return screenshots.results.map(data => data.image);
}

// function to get searchString?
