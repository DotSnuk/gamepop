import GridItem from '../GridItem/GridItem';
import PropTypes from 'prop-types';
import styles from './GameGrid.module.css';
import { Link } from 'react-router-dom';

export default function GameGrid({ dispatch, games }) {
  return (
    <div className={styles.container}>
      {games.map(game => (
        <Link to={`game/${game.id}`} key={game.id}>
          <GridItem dispatch={dispatch} game={game} />
        </Link>
      ))}
    </div>
  );
}

GameGrid.propTypes = {
  dispatch: PropTypes.func,
  games: PropTypes.array,
};
