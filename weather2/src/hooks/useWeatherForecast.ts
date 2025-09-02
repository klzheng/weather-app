import { useQuery } from "@tanstack/react-query";
import { weatherApiClient } from "../api/apiClient";

interface Location {
  latitude: number;
  longitude: number;
}

interface WeatherForecastParams {
  location: Location;
  days: number;
}

export const useWeatherForecast = async (params: WeatherForecastParams) => {
  return useQuery({
    queryKey: ["weather"],
    queryFn: async () => weatherApiClient(`forecast/days:lookup`, params),
  });
};
