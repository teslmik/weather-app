import React from 'react';
import styles from './styles.module.css';

export const Loader: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>Loading...</div>
    </div>
  )
}
