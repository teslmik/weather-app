"use client";

import React from "react";
import useSWR from "swr";
import { fetchInitialData } from "@/services/fetch-initial-data";
import { TransformWeather } from "@/types/transform-weather.type";

import styles from "./styles.module.css";

export const TableBody = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);
  const { data, isLoading, mutate } = useSWR<
    { activeIndex: number; cities: TransformWeather[] | undefined } | undefined
  >("weather", fetchInitialData);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    mutate({ cities: data?.cities, activeIndex: index });
  };

  return (
    <ul>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        data?.cities?.map((city, index) => (
          <li
            key={city.id}
            className={`${styles.tableBody} ${
              activeIndex === index ? styles.active : ""
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
