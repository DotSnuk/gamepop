import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <div className={styles.links}>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='browse'>Browse</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
