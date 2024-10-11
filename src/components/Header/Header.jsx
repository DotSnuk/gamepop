import Navbar from '../NavBar/Navbar';
import Title from '../Title/Title';
import CartLink from '../CartLink/CartLink';
import styles from './Header.module.css';

export default function Header({ openCart, cart }) {
  return (
    <header className={styles.container}>
      <Navbar />
      <Title />
      <CartLink openCart={openCart} cart={cart} />
    </header>
  );
}
