import { useState, useEffect } from 'react';
import { getPopularGames } from '../../api/api';
import GameGrid from '../GameGrid/GameGrid';

export default function Popular() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function handleGames() {
      const games = await getPopularGames().then(data => setGames(data));
      return games;
    }
    handleGames();
  }, []);
  console.log(games);
  return (
    <>
      <h1>Popular games</h1>
      {games.length === 0 ? <h1>loading...</h1> : <GameGrid games={games} />}
    </>
  );
}
