import { useState, useEffect } from 'react';
import { getGames } from '../../api/api';

export default function Popular() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function handleGames() {
      const games = await getGames().then(data => setGames(data));
      return games;
    }
    handleGames();
  }, []);
  console.log(games);
  // if (games.length === 0) return <h1>loading...</h1>;
  return (
    <>
      <h1>Popular games</h1>
      {games.length === 0 ? (
        <h1>loading...</h1>
      ) : (
        games.map(game => <h1 key={game.id}>{game.name}</h1>)
      )}
    </>
  );
}
