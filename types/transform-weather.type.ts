export type TransformWeather = {
  id: string;
  city: string;
  maxTemp: number;
  minTemp: number;
  windDirections: number;
  lastWeekTemperatures: number[];
  weekDays: string[];
}