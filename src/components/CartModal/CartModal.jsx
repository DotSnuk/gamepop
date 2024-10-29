import { useCartContext } from '../CartContextProvider/CartContextProvider';
import CartItem from '../CartItem/CartItem';
import styles from './CartModal.module.css';

export default function CartModal() {
  const { cart } = useCartContext();
  if (cart.length === 0)
    return (
      <div className={styles.container}>
        <h1>Your cart is empty</h1>
      </div>
    );

  console.log(cart);
  return (
    <div className={styles.container}>
      <h1>Your cart</h1>{' '}
      <div className={styles.cart}>
        {cart.map(game => {
          return <CartItem key={game.game.id} game={game} />;
        })}
      </div>
    </div>
  );
}
