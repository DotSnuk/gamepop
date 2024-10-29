import styles from './CartItem.module.css';
import { ACTIONS } from '../../assets/constants';
import { useCartContext } from '../CartContextProvider/CartContextProvider';

export default function CartItem({ game }) {
  const { dispatch } = useCartContext();
  return (
    <div className={styles.container}>
      <div aria-label='name' className={styles.name}>
        {game.game.name}
      </div>
      <div className={styles.input}>
        <input
          type='button'
          aria-label='decrement'
          value='-'
          onClick={() => dispatch({ type: ACTIONS.DECREMENT, payload: game })}
        />
        <input
          type='text'
          aria-label='amount'
          value={game.amount}
          onChange={() => {}}
        />
        <input
          type='button'
          aria-label='increment'
          value='+'
          onClick={() => dispatch({ type: ACTIONS.INCREMENT, payload: game })}
        />
      </div>

      <div aria-label='price' className={styles.price}>
        {game.amount * game.game.price}
      </div>
    </div>
  );
}
