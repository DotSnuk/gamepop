import { useContext } from 'react';
import { useCartContext } from '../CartContextProvider/CartContextProvider';
import CartItem from '../CartItem/CartItem';
import styles from './CartModal.module.css';

export default function CartModal({ closeModal }) {
  const { cart } = useCartContext();
  if (cart.length === 0)
    return (
      <div className={styles.container}>
        <h1>Your cart is empty</h1>
      </div>
    );

  const total = cart.reduce(
    (accumulator, current) =>
      calculateTotal(accumulator, current.amount * current.game.price),
    0,
  );

  return (
    <div onClick={e => e.stopPropagation()} className={styles.container}>
      <h1>Your cart</h1>{' '}
      <div className={styles.cart}>
        {cart.map(game => {
          return (
            <CartItem key={game.game.id} game={game} closeModal={closeModal} />
          );
        })}
      </div>
      <div className={styles.totalWrapper}>
        <div className={styles.total}>total: {total}$</div>
      </div>
      <input type='button' onClick={() => closeModal()} value={'Close'} />
    </div>
  );
}

function calculateTotal(accumulator, current) {
  return accumulator + current;
}
