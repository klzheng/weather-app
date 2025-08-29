import moment from "moment";
import { WeatherIcon } from "./WeatherIcon";

interface ForecastProps {
  data: any;
  timeFrame: any;
  time: any;
  day: any;
  date: any;
  temp: any;
  tempRange: any;
}

export default function Forecast({
  data,
  timeFrame,
  time,
  day,
  date,
  temp,
  tempRange,
}: ForecastProps) {
  return (
    <>
      {Object.keys(data).length !== 0 && (
        <section className="my-5 ">
          <h1 className="mb-2 text-lg font-semibold tracking-wide text-gray-400">
            {timeFrame} FORECAST
          </h1>
          <div className="flex space-x-10 overflow-auto 2xs:w-60 xs:w-96 my-2 transition-all">
            {data.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center pb-2"
              >
                <p>{time && moment(item.startTime).format("hA")}</p>
                {day && (
                  <p>
                    {moment(item.startTime).format("MMM D") ===
                    moment().format("MMM D")
                      ? "Today"
                      : moment(item.startTime).format("dddd")}
                  </p>
                )}
                <p className="text-gray-400">
                  {date && moment(item.startTime).format("MMM D")}
                </p>

                <WeatherIcon
                  weatherCode={item.values.weatherCode}
                  weatherCondition={false}
                />

                <p>{temp && item.values.temperature.toFixed(0) + "°"}</p>
                {tempRange && (
                  <p>
                    {item.values.temperatureMax.toFixed(0) + "°"}/
                    {item.values.temperatureMin.toFixed(0) + "°"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
