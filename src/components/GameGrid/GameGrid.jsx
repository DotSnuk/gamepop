import GridItem from '../GridItem/GridItem';
import PropTypes from 'prop-types';
import styles from './GameGrid.module.css';

export default function GameGrid({ games }) {
  return (
    <div className={styles.container}>
      {games.map(game => (
        <GridItem game={game} key={game.id} />
      ))}
    </div>
  );
}

GameGrid.propTypes = {
  games: PropTypes.array,
};
