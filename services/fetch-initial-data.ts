import { TABLE_INITIAL_DATA } from "@/constants/table-initial-data";
import { transformWeatherData } from "@/helpers/transform-weather-data";
import { WeatherType } from "@/types/weather.type";

export const fetchInitialData = async (data?: typeof TABLE_INITIAL_DATA) => {
  const fetchData = data ? data : TABLE_INITIAL_DATA;

  try {
    const weatherDataPromises = fetchData.map(async (cityData) => {
      const { latitude, longitude } = cityData;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,winddirection_10m&current_weather=true&windspeed_unit=ms&past_days=7&forecast_days=1`;
      const response = await fetch(url);
      const weatherData: WeatherType = await response.json();
      return weatherData;
    });

    const weatherData = await Promise.all(weatherDataPromises);
    const cities = transformWeatherData(weatherData, fetchData);

    return { activeIndex: 0, cities };
  } catch (error) {
    console.error("Error getting weather data:", error);
  }
};
