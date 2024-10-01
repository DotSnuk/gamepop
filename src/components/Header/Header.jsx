import Navbar from '../NavBar/Navbar';
import Title from '../Title/Title';
import Cart from '../Cart/Cart';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.container}>
      <Navbar />
      <Title />
      <Cart />
    </header>
  );
}
