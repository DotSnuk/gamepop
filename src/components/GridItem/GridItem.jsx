import PropTypes from 'prop-types';
import styles from './GridItem.module.css';

export default function GridItem({ game }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.name}>{game.name}</h2>
      <img className={styles.background} src={game.background_image} />
      <div className={styles.priceContainer}>
        <div className={styles.price}>{game.price}$</div>
        <div className={styles.addToCart}></div>
      </div>
    </div>
  );
}

GridItem.propTypes = {
  game: PropTypes.object,
};
