export const weatherApiClient = async (
  endpoint: string,
  params: Record<string, any>
) => {
  const qs = require("qs");

  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const queryParams = qs.stringify(
    { key: weatherApiKey ?? "", ...params },
    { allowDots: true }
  );

  const response = await fetch(
    `${process.env.REACT_APP_WEATHER_API_BASE_URL}/${endpoint}?${queryParams}`
  );

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};
