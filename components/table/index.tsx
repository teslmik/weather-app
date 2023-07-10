import React from 'react';
import { InputsContainer } from '../inputs-container';
import { TableContainer } from '../table-container';
import styles from './styles.module.css';

export const Table = () => {
  return (
    <div className={styles.tableContainer}>
      <InputsContainer />
      <TableContainer />
    </div>
  )
};
