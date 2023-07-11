import React from 'react';
import { InputsContainer } from '../inputs-container';
import { TableContainer } from '../table-container';

import styles from './styles.module.css';

export const Table: React.FC = () => {
  return (
    <div className={styles.tableContainer}>
      <InputsContainer />
      <TableContainer />
    </div>
  )
};
