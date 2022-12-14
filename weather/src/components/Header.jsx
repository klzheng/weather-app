import WeatherIcon from "./WeatherIcon"

export default function Header(props) {

    const { data, address } = props

    return (
        <>
            {Object.keys(data).length !== 0 &&
                <section className=" w-104">

                    <div className="sm:flex sm:flex-row 2xs:flex-col gap-x-8 2xs:space-y-5 sm:gap-y-0 justify-center items-center">
                        <div className="col-span-1 flex items-center justify-center">
                            <span className="text-6xl tracking-tight">{data[0].values.temperature.toFixed(0)}°</span>
                        </div>

                        <div className="col-span-2 flex flex-col items-center justify-center">
                            <p className="text-3xl text-center">{address[0]}</p>
                            <p className="font-extralight text-sm text-center">
                                {address[1] && <span>{address[1]}</span>}
                                {address[2] && <span>,{address[2]}</span>}
                            </p>
                        </div>

                        <div className="col-span-1 flex-col flex ">
                            <WeatherIcon
                                weatherCode={data[0].values.weatherCode}
                                weatherCondition={true}
                                styling={"text-[3.0rem]"} />
                        </div>
                    </div>

                    <div className=" flex flex-row items-center justify-center text-sm font-light mt-12 space-x-4 text-gray-300">
                        <span>
                            <i className="fa-solid fa-umbrella"></i> Precipitation: {data[0].values.precipitationProbability}% {data[0].values.precipitationIntensity !== 0 && `(${data[0].values.precipitationIntensity} in)`}
                        </span>
                        <span>
                            <i className="fa-solid fa-wind"></i> Wind: {data[0].values.windSpeed} mph
                        </span>
                    </div>
                    
                    <div className=" flex flex-row items-center justify-center text-sm font-light space-x-4 text-gray-300 mb-4 ">
                        <span>
                            <i className="fa-solid fa-droplet"></i> Humidity: {data[0].values.humidity}%
                        </span>
                        <span>
                            <i className="wi wi-hot"></i> UV Index: {data[0].values.uvIndex}
                        </span>
                    </div>


                </section>}
        </>
    )
}