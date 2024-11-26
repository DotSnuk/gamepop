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

// adult tags ids: 312, 786, 1081, 785
export async function getPopularGames() {
  const gamesArray = [];
  let page = 0;
  while (gamesArray.length < 12) {
    page += 1;
    const today = new Date();
    const oneYearAgo = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1),
    );
    const todayFormatted = formatDate(today);
    const oneYearAgoFormatted = formatDate(oneYearAgo);
    const searchDate = `dates=${oneYearAgoFormatted},${todayFormatted}`;
    const searchRating = `ordering=-rating`;
    const searchSize = `page_size=12`;
    const exludeTags = `tags=312,786,1081,785`;
    const games = await fetch(
      `${URL}games?key=${API_KEY}&page=${page}&${searchDate}&${searchRating}&${searchSize}`,
      {
        mode: 'cors',
      },
    ).then(response => {
      if (!response.ok) throw new Error('server error');
      return response.json();
    });
    gamesArray.push(...filterGames(games.results));
    // return games.results;
  }
  return gamesArray.slice(0, 12);
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
  return screenshots.results;
}

function filterGames(games) {
  const filteredGames = games.reduce((results, game) => {
    const tags = game.tags.map(tag => tag.id);
    if (tags.every(doesNotHaveTags)) results.push(game);
    return results;
  }, []);
  return filteredGames;
}

function doesNotHaveTags(tagId) {
  const adultTagIds = [312, 786, 1081, 785];
  return !adultTagIds.includes(tagId);
}

// function to get searchString?
