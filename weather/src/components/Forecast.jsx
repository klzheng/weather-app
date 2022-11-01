import moment from "moment"
import WeatherIcon from "./WeatherIcon"

export default function Forecast(props) {

    const { data, timeFrame, time, day, date, temp, tempRange } = props

    return (
        <>
            {Object.keys(data).length !== 0 &&
                <section className="mb-5 ">
                    <h1 className="mb-2 text-lg font-semibold tracking-wide text-gray-400">{timeFrame} FORECAST</h1>
                    {console.log(data)}
                    <div className="flex space-x-10 overflow-auto w-96 my-2">
                        {data.map((item, index) => (
                            <div
                                className="flex flex-col items-center justify-center pb-2"
                            >
                                <p>
                                    {time && moment(item.startTime).format("hA")}
                                </p>
                                <p>
                                    {day && moment(item.startTime).format("dddd")}
                                </p>
                                <p className="text-gray-400">
                                    {date && moment(item.startTime).format("MMM D")}
                                </p>


                                <WeatherIcon 
                                    weatherCode={item.values.weatherCode}
                                    weatherCondition={false}/>

                                <p>
                                    {temp && (item.values.temperature.toFixed(0) + "°")}
                                </p>
                                {tempRange && 
                                <p>
                                    {item.values.temperatureMax.toFixed(0) + "°"}/{item.values.temperatureMin.toFixed(0) + "°"}
                                </p>}
                            </div>
                        ))}
                    </div>
                </section>}
        </>
    )
}