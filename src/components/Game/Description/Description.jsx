import parse from 'html-react-parser';
import styles from './Description.module.css';

export default function Description({ text }) {
  return <div className={styles.description}>{parse(text)}</div>;
}
