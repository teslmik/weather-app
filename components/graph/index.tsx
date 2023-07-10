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
import { TransformWeather } from "@/types/transform-weather.type";

import styles from "./styles.module.css";
import { fetchInitialData } from "@/services/fetch-initial-data";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const Graph: React.FC = () => {
  const { data: weatherData, mutate, isLoading } = useSWR<
    { activeIndex: number; cities: TransformWeather[] } | undefined
  >("weather");

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
    labels: weatherData && weatherData?.cities[weatherData.activeIndex]?.weekDays,
    datasets: [
      {
        label: "Temperature",
        data:
          weatherData &&
          weatherData?.cities[weatherData.activeIndex]?.lastWeekTemperatures,
        backgroundColor: gradient,
        barThickness: 28,
        barPercentage: 0.8,
        categoryPercentage: 1,
      },
    ],
  };

  if (!weatherData && isLoading) mutate(() => fetchInitialData());

  return (
    <div className={styles.graphContainer}>
      <div className={styles.barTitle}>
        <p>Analystics</p>
        <p className={styles.valueName}>
          {weatherData?.cities[weatherData.activeIndex]?.city}
        </p>
      </div>
      <div className={styles.barContainer}>
        <Bar ref={chartRef} options={options} data={data} />
      </div>
    </div>
  );
};
