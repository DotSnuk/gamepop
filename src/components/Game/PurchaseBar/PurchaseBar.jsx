import styles from './PurchaseBar.module.css';
import PropTypes from 'prop-types';
import { useCartContext } from '../../../app/App';
import { ACTIONS } from '../../../assets/constants';

export default function PurchaseBar({ game }) {
  const { dispatch } = useCartContext();
  return (
    <div className={styles.container}>
      <div className={styles.name}>Buy {game.name}</div>
      <button
        onClick={() => dispatch({ type: ACTIONS.ADDGAME, payload: game })}
        aria-label='add'
      >
        ${game.price}
      </button>
    </div>
  );
}

PurchaseBar.propTypes = {
  game: PropTypes.object,
};
