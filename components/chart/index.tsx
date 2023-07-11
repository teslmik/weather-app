"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useSWR from "swr";
import { Bar } from "react-chartjs-2";
import { FetchDataType } from "@/types/types";

import styles from "./styles.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Chart: React.FC = () => {
  const { data: weatherData } = useSWR<FetchDataType | undefined>("weather");

  const chartRef = React.useRef<ChartJS<"bar">>(null);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false,
    elements: {
      bar: {
        borderRadius: {
          topLeft: 8,
          topRight: 8,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "#313131",
          lineWidth: 1,
          borderDash: [5, 5],
        },
        beginAtZero: true,
      },
    },
  };

  const ctx = document
    .createElement("canvas")
    .getContext("2d") as CanvasRenderingContext2D;
  const gradient = ctx.createLinearGradient(0, 0, 0, 320);
  gradient.addColorStop(0, "#B3FC4F");
  gradient.addColorStop(1, "#173102");

  const data = {
    labels:
      weatherData && weatherData?.filteredCities[weatherData.activeIndex]?.weekDays,
    datasets: [
      {
        label: "Temperature",
        data:
          weatherData &&
          weatherData?.filteredCities[weatherData.activeIndex]?.lastWeekTemperatures,
        backgroundColor: gradient,
        barThickness: 28,
        barPercentage: 0.8,
        categoryPercentage: 1,
      },
    ],
  };

  return (
    <div className={styles.graphContainer}>
      <div className={styles.barTitle}>
        <p>Analystics</p>
        <p className={styles.valueName}>
          {weatherData?.filteredCities[weatherData.activeIndex]?.city}
        </p>
      </div>
      <div className={styles.barContainer}>
        <Bar ref={chartRef} options={options} data={data} />
      </div>
    </div>
  );
};
