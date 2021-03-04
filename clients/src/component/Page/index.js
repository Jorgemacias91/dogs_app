import React from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
import dog from '../../img/dog.png'

export function Page() {
  return (
    <header>

      <div className={styles.container}>

        <div className={styles.text}>
          <h2>Your Favorite <br/>Dog</h2>
          <Link to="/home">Home</Link>
        </div>

        <img className={styles.imagen}src={dog} />

      </div>
      <div className={styles.wave}>
      <div className={styles.style1}><svg viewBox="0 0 500 150" preserveAspectRatio="none" className={styles.style2}><path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" className={styles.style3}></path></svg></div>
      </div>

    </header>

  )
};

export default Page;