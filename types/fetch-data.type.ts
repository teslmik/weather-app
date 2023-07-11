import { TransformWeather } from "./transform-weather.type";

export type FetchDataType = {
  activeIndex: number;
  cities: TransformWeather[];
  filteredCities: TransformWeather[];
};