export const weatherApiClient = async (
  endpoint: string,
  params: Record<string, any>
) => {
  const weatherApiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const queryParams = new URLSearchParams({
    key: weatherApiKey ?? "",
    ...params,
  }).toString();

  const response = await fetch(
    `${process.env.REACT_APP_WEATHER_API_BASE_URL}/${endpoint}?${queryParams}`
  );

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};
