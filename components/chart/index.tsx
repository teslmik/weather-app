"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import useSWR from "swr";
import { Bar } from "react-chartjs-2";
import { FetchDataType } from "@/types/types";
import { createGradient } from "@/helpers/create-chart-gradient";
import { options } from "./config-bar";

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

  const chartRef = React.useRef<ChartJS<"bar"> | null>(null);
  const [chartData, setChartData] = React.useState<ChartJS<"bar">["data"]>({
    labels: [],
    datasets: [],
  });

  React.useEffect(() => {
    const chart = chartRef.current;

    if (!chart || !weatherData) {
      return;
    }

    const newChartData = {
      labels: weatherData.filteredCities[weatherData.activeIndex]?.weekDays || [],
      datasets: [
        {
          label: "Temperature",
          data: weatherData.filteredCities[weatherData.activeIndex]?.lastWeekTemperatures || [],
          backgroundColor: createGradient(chart.ctx, chart.chartArea),
          barThickness: 28,
          barPercentage: 0.8,
          categoryPercentage: 1,
        },
      ],
    };

    setChartData(newChartData);
  }, [weatherData]);

  return (
    <div className={styles.graphContainer}>
      <div className={styles.barTitle}>
        <p>Analystics</p>
        <p className={styles.valueName}>
          {weatherData?.filteredCities[weatherData.activeIndex]?.city}
        </p>
      </div>
      <div className={styles.barContainer}>
        <Bar ref={chartRef} options={options} data={chartData} />
      </div>
    </div>
  );
};
