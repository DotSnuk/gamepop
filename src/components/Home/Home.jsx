import Popular from '../Popular/Popular';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className={styles.content}>
      <Popular />
    </div>
  );
}
