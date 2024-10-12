import PropTypes from 'prop-types';
import styles from './GridItem.module.css';
import { Plus } from 'lucide-react';
import { ACTIONS } from '../../assets/constants';

export default function GridItem({ dispatch, game }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.name}>{game.name}</h2>
      <img className={styles.background} src={game.background_image} />
      <div className={styles.priceContainer}>
        <div className={styles.price}>{game.price}$</div>
        <a
          href='#'
          aria-label='add'
          onClick={() =>
            dispatch({ type: ACTIONS.ADDGAME, payload: { game: game } })
          }
          className={styles.addToCart}
        >
          <Plus />
        </a>
      </div>
    </div>
  );
}

GridItem.propTypes = {
  dispatch: PropTypes.func,
  game: PropTypes.object,
};
