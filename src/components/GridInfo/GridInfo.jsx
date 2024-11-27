import PropTypes from 'prop-types';
import styles from './GridInfo.module.css';

export default function GridInfo({ game }) {
  return (
    <div className={styles.priceContainer}>
      <div className={styles.name}>{game.name}</div>
      <div className={styles.price}>{game.price}$</div>
    </div>
  );
}

GridInfo.propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.object,
};
