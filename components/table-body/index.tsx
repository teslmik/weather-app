"use client";

import React from "react";
import useSWR from "swr";
import { fetchInitialData } from "@/services/fetch-initial-data";
import { FetchDataType } from "@/types/types";

import styles from "./styles.module.css";

export const TableBody: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const { data, isLoading, mutate } = useSWR<FetchDataType | undefined>(
    "weather",
    () => fetchInitialData()
  );

  const handleClick = (index: number) => {
    setActiveIndex(index);
    mutate((prev) => ({ ...prev, activeIndex: index } as FetchDataType));
  };

  return (
    <ul className={styles.tableBodyList}>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        data?.filteredCities.map((city, index) => (
          <li
            key={city.id}
            className={`${styles.tableBody} ${activeIndex === index ? styles.active : ""
              }`}
            onClick={() => handleClick(index)}
          >
            <span>{city.city}</span>
            <span>{city.maxTemp}</span>
            <span>{city.minTemp}</span>
            <span>{city.windDirections}</span>
          </li>
        ))
      )}
    </ul>
  );
};
