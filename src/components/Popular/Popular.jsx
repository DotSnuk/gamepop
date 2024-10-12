import { useState, useEffect } from 'react';
import { getPopularGames } from '../../api/api';
import { addPrices } from '../../utils/addPrices';
import GameGrid from '../GameGrid/GameGrid';
import PropTypes from 'prop-types';

export default function Popular({ dispatch }) {
  const [games, setGames] = useState([]);
  useEffect(() => {
    async function handleGames() {
      const games = await getPopularGames().then(data =>
        setGames(addPrices(data)),
      );
      return games;
    }
    handleGames();
  }, []);
  console.log(games);
  return (
    <>
      <h1>Popular games</h1>
      {games.length === 0 ? (
        <h2>loading...</h2>
      ) : (
        <GameGrid dispatch={dispatch} games={games} />
      )}
    </>
  );
}

Popular.propTypes = {
  dispatch: PropTypes.func,
};
