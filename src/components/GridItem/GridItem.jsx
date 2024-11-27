import PropTypes from 'prop-types';
import styles from './GridItem.module.css';
import GridInfo from '../GridInfo/GridInfo';

export default function GridItem({ game }) {
  return (
    <div className={styles.container}>
      <img className={styles.background} src={game.background_image} />
      <GridInfo className={styles.info} game={game} />
    </div>
  );
}

GridItem.propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.object,
};
