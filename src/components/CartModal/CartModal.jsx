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

  return (
    <div onClick={e => e.stopPropagation()} className={styles.container}>
      <h1>Your cart</h1>{' '}
      <div className={styles.cart}>
        {cart.map(game => {
          return <CartItem key={game.game.id} game={game} />;
        })}
      </div>
      <input type='button' onClick={() => closeModal()} value={'Close'} />
    </div>
  );
}
