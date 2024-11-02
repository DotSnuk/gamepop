import styles from './CartItem.module.css';
import { ACTIONS } from '../../assets/constants';
import { useCartContext } from '../CartContextProvider/CartContextProvider';
import { Link } from 'react-router-dom';

export default function CartItem({ game, closeModal }) {
  const { dispatch } = useCartContext();
  return (
    <div className={styles.container}>
      <div aria-label='name' className={styles.name}>
        <Link to={`game/${game.game.id}`} onClick={() => closeModal()}>
          {game.game.name}
        </Link>
      </div>
      <div className={styles.input}>
        <input
          type='button'
          aria-label='decrement'
          value='-'
          onClick={() =>
            dispatch({ type: ACTIONS.DECREMENT, payload: { game: game } })
          }
        />
        <input
          type='number'
          aria-label='amount'
          value={game.amount}
          onChange={e =>
            dispatch({
              type: ACTIONS.CHANGEAMOUNT,
              payload: { game: game, newAmount: e.target.value },
            })
          }
        />
        <input
          type='button'
          aria-label='increment'
          value='+'
          onClick={() =>
            dispatch({ type: ACTIONS.INCREMENT, payload: { game: game } })
          }
        />
      </div>

      <div aria-label='price' className={styles.price}>
        {game.amount * game.game.price}
      </div>
    </div>
  );
}
