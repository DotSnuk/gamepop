import GridItem from '../GridItem/GridItem';
import PropTypes from 'prop-types';
import styles from './GameGrid.module.css';
import { Link } from 'react-router-dom';

export default function GameGrid({ games }) {
  return (
    <div className={styles.container}>
      {games.map(game => (
        <div className={styles.gameWrapper} key={game.id}>
          <Link to={`game/${game.id}`} state={{ test: 123 }}>
            <GridItem game={game} />
          </Link>
        </div>
      ))}
    </div>
  );
}

GameGrid.propTypes = {
  dispatch: PropTypes.func,
  games: PropTypes.array,
};
