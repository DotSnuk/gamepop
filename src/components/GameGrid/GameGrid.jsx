import GridItem from '../GridItem/GridItem';
import PropTypes from 'prop-types';
import styles from './GameGrid.module.css';

export default function GameGrid({ dispatch, games }) {
  return (
    <div className={styles.container}>
      {games.map(game => (
        <GridItem dispatch={dispatch} game={game} key={game.id} />
      ))}
    </div>
  );
}

GameGrid.propTypes = {
  dispatch: PropTypes.func,
  games: PropTypes.array,
};
