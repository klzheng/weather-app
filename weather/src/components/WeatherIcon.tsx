interface WeatherIconProps {
  weatherCode: any;
  weatherCondition: any;
  styling?: any;
}

export const WeatherIcon = ({
  weatherCode,
  weatherCondition,
  styling,
}: WeatherIconProps) => {
  const getWeatherIcon = (weatherCode: any) => {
    switch (weatherCode) {
      case "1000":
        return ["wi-day-sunny", "Clear"];
      case "1100":
        return ["wi-day-sunny", "Mostly Clear"];
      case "1101":
        return ["wi-day-cloudy", "Partly Cloudy"];
      case "1102":
        return ["wi-cloud", "Mostly Cloudy"];
      case "1001":
        return ["wi-cloudy", "Cloudy"];
      case "2000":
        return ["wi-fog", "Fog"];
      case "2100":
        return ["wi-windy", "Light Fog"];
      case "4000":
        return ["wi-showers", "Drizzle"];
      case "4001":
        return ["wi-rain", "Rain"];
      case "4200":
        return ["wi-showers", "Light Rain"];
      case "4201":
        return ["wi-rain-wind", "Heavy Rain"];
      case "5000":
        return ["wi-snowflake-cold", "Snow"];
      case "5001":
        return ["wi-snowflake-cold", "Flurries"];
      case "5100":
        return ["wi-snow", "Light Snow"];
      case "5101":
        return ["wi-snowflake-cold", "Heavy Snow"];
      case "6000":
        return ["wi-rain-mix", "Freezing Drizzle"];
      case "6001":
        return ["wi-rain-mix", "Freezing Rain"];
      case "6200":
        return ["wi-rain-mix", "Light Freezing Rain"];
      case "6201":
        return ["wi-hail", "Heavy Freezing Rain"];
      case "7000":
        return ["wi-hail", "Ice Pellets"];
      case "7101":
        return ["wi-hail", "Heavy Ice Pellets"];
      case "7102":
        return ["wi-hail", "Light Ice Pellets"];
      case "8000":
        return ["wi-thunderstorm", "Thunderstorm"];
      default:
        return ["wi-alien", "Unknown"];
    }
  };

  return (
    <div className={weatherCondition ? " text-center " : "py-2 text-center"}>
      <i
        className={`text-3xl wi ${
          getWeatherIcon(weatherCode.toString())[0]
        } ${styling}`}
      ></i>
      {weatherCondition && (
        <p className="text-sm font-extralight text-center my-1">
          {getWeatherIcon(weatherCode.toString())[1]}
        </p>
      )}
    </div>
  );
};
