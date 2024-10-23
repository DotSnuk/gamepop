import { useCartContext } from '../../app/App';
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
      {cart.map(item => {
        return (
          <div className={styles.item} key={item.game.id}>
            {item.game.name}
          </div>
        );
      })}
    </div>
  );
}
