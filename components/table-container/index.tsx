import React from "react";

import { TABLE_HEADER } from "@/constants/table-header";
import { TableBody } from "../table-body";

import styles from "./styles.module.css";

export const TableContainer = () => {
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
