import styles from './PurchaseBar.module.css';
import PropTypes from 'prop-types';
import { useCartContext } from '../../CartContextProvider/CartContextProvider';
import { ACTIONS } from '../../../assets/constants';

export default function PurchaseBar({ game }) {
  const { dispatch } = useCartContext();
  return (
    <div className={styles.container}>
      <div className={styles.name}>Buy {game.name}</div>
      <input
        type='button'
        value={game.price}
        onClick={() => dispatch({ type: ACTIONS.ADDGAME, payload: game })}
        aria-label='add'
      />
    </div>
  );
}

PurchaseBar.propTypes = {
  game: PropTypes.object,
};
