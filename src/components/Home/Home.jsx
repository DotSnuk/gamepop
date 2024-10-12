import { getGames } from '../../api/api';
import { useEffect, useState } from 'react';
import Popular from '../Popular/Popular';
import styles from './Home.module.css';
import { useOutletContext } from 'react-router-dom';

export default function Home() {
  const [dispatch] = useOutletContext();

  return (
    <div className={styles.content}>
      <Popular dispatch={dispatch} />
    </div>
  );
}
