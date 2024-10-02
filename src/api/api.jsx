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
