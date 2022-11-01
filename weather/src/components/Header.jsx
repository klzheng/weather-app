import WeatherIcon from "./WeatherIcon"

export default function Header(props) {

    const { data } = props

    return (
        <>
            {Object.keys(data).length !== 0 && <section className="grid grid-cols-3 gap-x-6 mt-8 ">
                {console.log(data[0].values)}
                <div className="col-span-1 flex items-center justify-center">
                    <span className="text-6xl">{data[0].values.temperature.toFixed(0)}°</span>
                </div>

                <div className="col-span-1 flex flex-col items-center justify-center">
                    <p className="text-3xl">City</p>
                    <p className="font-extralight text-sm">Country</p>
                </div>

                <div className="col-span-1 flex-col flex items-center justify-center">
                    <WeatherIcon
                        weatherCode={data[0].values.weatherCode}
                        weatherCondition={true}
                        styling={"text-[3.5rem]"} />
                </div>

                <div className="col-span-3 flex flex-col items-center text-sm font-light space-y-1 mt-5">
                    <span>
                        <i className="wi wi-hot"></i> UV Index: {data[0].values.uvIndex}
                    </span>
                    <span>
                        <i className="fa-solid fa-droplet"></i> Humidity: {data[0].values.humidity}%
                    </span>
                    <span>
                        <i className="fa-solid fa-umbrella"></i> Precipitation: {data[0].values.precipitationProbability}% {data[0].values.precipitationIntensity !== 0 && `(${data[0].values.precipitationIntensity})` }
                    </span>
                    <span>
                        <i className="fa-solid fa-wind"></i> Wind: {data[0].values.windSpeed} mph
                    </span>
                </div>


            </section>}
        </>
    )
}