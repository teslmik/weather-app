import { OptionType } from "@/types/options.type";

const searchUrl = (value: string) =>
  `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10&language=en&format=json`;

export const fetchSearchByCountry = async (
  inputValue: string
): Promise<OptionType[]> => {
  const response = await fetch(searchUrl(inputValue));
  const data = await response.json();
  const options = data.results.map((item: any) => ({
    value: item.name,
    label: `${item.name}, ${item.country}`,
    latitude: item.latitude,
    longitude: item.longitude,
  }));

  return options;
};
