import React from "react";
import { TABLE_HEADER } from "@/constants/table-header";
import { TableBody } from "@/components/components";

import styles from "./styles.module.css";

export const TableContainer: React.FC = () => {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        {TABLE_HEADER.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
      <TableBody/>
    </div>
  );
};
