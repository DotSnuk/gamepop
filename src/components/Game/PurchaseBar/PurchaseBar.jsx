import styles from './PurchaseBar.module.css';

export default function PurchaseBar({ game }) {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{game.name}</div>
      <button aria-label='add'>${game.price}</button>
    </div>
  );
}
