import { useEffect } from "react";
import moment from "moment"
import queryString from "query-string"
import Background from "./Background";
import Container from "./Container";
import Forecast from "./Forecast";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Geocode from "react-geocode";
// import weatherData from "../data2.json"


export default function Home() {

    const [isLoading, setLoading] = useState(true)
    const [hourlyData, setHourlyData] = useState({})
    const [dailyData, setDailyData] = useState({})
    const [currentData, setCurrentData] = useState({})
    const [address, setAddress] = useState([])
    const defaultLatLong = [40.712775, -74.005973]
    const [latLong, setLatLong] = useState(defaultLatLong)

    const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
    const apikey = process.env.REACT_APP_TOMORROW_API_KEY;
    const fields = [
        "precipitationIntensity",
        "precipitationProbability",
        "windSpeed",
        "temperature",
        "temperatureMin",
        "temperatureMax",
        "temperatureApparent",
        "humidity",
        "cloudCover",
        "uvIndex",
        "weatherCode",
    ];
    const units = "imperial";
    const location = latLong
    const timesteps = ["current", "1h", "1d"];
    const now = moment.utc();
    const startTime = moment.utc(now).add(0, "minutes").toISOString();
    const endTime = moment.utc(now).add(7, "days").toISOString();
    const getTimelineParameters = queryString.stringify({
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
    }, { arrayFormat: "comma" });

    const getWeatherData = async () => {

        try {
            setLoading(true)
            const response = await fetch(getTimelineURL + "?" + getTimelineParameters, { method: "GET", compress: true })
            const weatherData = await response.json()
            setCurrentData(weatherData.data.timelines[2].intervals)
            setHourlyData(weatherData.data.timelines[1].intervals.slice(0, 24))
            setDailyData(weatherData.data.timelines[0].intervals)
            console.log(weatherData)
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }

    Geocode.setApiKey(process.env.REACT_APP_GMAPS_GEOCODING_API_KEY);
    const getLatLong = async (location) => {
        try {
            const res = await Geocode.fromAddress(location)
            const address = await res.results[0].formatted_address
            const { lat, lng } = await res.results[0].geometry.location
            setAddress(address.replace(/[0-9]/g, '').split(","))
            setLatLong([lat, lng])
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getLatLong(latLong) // eslint-disable-next-line
    }, [])


    useEffect(() => {
        getWeatherData() // eslint-disable-next-line
    }, [latLong])


    


    return (
        <Background data={currentData}>
            
            <Container isLoading={isLoading}>
                
                <Header
                    data={currentData}
                    address={address} />

                <SearchBar
                    getLatLong={getLatLong} />

                <Forecast
                    timeFrame={"HOURLY"}
                    data={hourlyData}
                    time={true}
                    day={false}
                    date={false}
                    temp={true}
                    tempRange={false} />

                <Forecast
                    timeFrame={"DAILY"}
                    data={dailyData}
                    time={false}
                    day={true}
                    date={true}
                    temp={false}
                    tempRange={true} />

                
            </Container>
        </Background>
    )
}