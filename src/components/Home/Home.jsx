import { getGames } from '../../api/api';
import { useEffect, useState } from 'react';

export default function Home() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function handleGames() {
      const games = await getGames().then(data => setGames(data));
      return games;
    }
    handleGames();
  }, []);
  console.log(games);
  if (games.length === 0) return <h1>loading...</h1>;
  return games.map(game => <h1 key={game.id}>{game.name}</h1>);
}
