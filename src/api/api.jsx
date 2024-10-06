import formatDate from '../utils/formatDate';
const API_KEY = import.meta.env.VITE_RAWG_IO_KEY;
const URL = 'https://api.rawg.io/api/';

export async function getGames() {
  const games = await fetch(`${URL}games?key=${API_KEY}`, {
    mode: 'cors',
  }).then(response => {
    if (response.status >= 400) throw new Error('server error');
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
  console.log(todayFormatted);
  console.log(oneYearAgoFormatted);
  const searchTerm = `dates=${oneYearAgoFormatted},${todayFormatted}`;
  const games = await fetch(`${URL}games?key=${API_KEY}&${searchTerm}`, {
    mode: 'cors',
  }).then(response => {
    if (response.status >= 400) throw new Error('server error');
    return response.json();
  });
  console.log(games);
  return games.results;
}
