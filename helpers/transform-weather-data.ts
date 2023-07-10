import { TABLE_INITIAL_DATA } from "@/constants/table-initial-data";
import { TransformWeather } from "@/types/transform-weather.type";
import { WeatherType } from "@/types/weather.type";
import { nanoid } from "nanoid";

export const transformWeatherData = (
  weatherArr: WeatherType[] | undefined,
  citiesData: typeof TABLE_INITIAL_DATA
): TransformWeather[] => {
  if (!weatherArr) {
    throw new Error("Weather not found...");
  }

  return weatherArr.map((data, index) => {
    const todayForecastTemperatures = data.hourly.temperature_2m.slice(-24);
    const weekDays = [];
    const lastWeekTemperatures = [];

    for (let i = 0; i < data.hourly.temperature_2m.length - 24; i += 24) {
      const groupTemp = data.hourly.temperature_2m.slice(i, i + 24);
      const average =
        groupTemp.reduce((sum, value) => sum + value, 0) / groupTemp.length;
      lastWeekTemperatures.push(+average.toFixed(2));

      const weekDay = data.hourly.time.slice(i, i + 24)[0];
      const date = new Date(weekDay);
      const dayOfWeek = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
      }).format(date);
      weekDays.push(dayOfWeek);
    }

    const windDirections = data.current_weather.winddirection;
    const city = citiesData[index].value;
    const maxTemp = Math.max(...todayForecastTemperatures);
    const minTemp = Math.min(...todayForecastTemperatures);
    const id = nanoid();

    return {
      id,
      city,
      maxTemp,
      minTemp,
      windDirections,
      lastWeekTemperatures,
      weekDays,
    };
  });
};
