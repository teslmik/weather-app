import { TransformWeather } from "./types";

export type FetchDataType = {
  activeIndex: number;
  cities: TransformWeather[];
  filteredCities: TransformWeather[];
};