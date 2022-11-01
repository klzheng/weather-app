import { useEffect } from "react";
import moment from "moment"
import queryString from "query-string"
import Background from "./Background";
import Container from "./Container";
import Forecast from "./Forecast";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useState } from "react";
import weatherData from "../data.json"

export default function Home() {


// set the Timelines GET endpoint as the target URL
const getTimelineURL = "https://api.tomorrow.io/v4/timelines";

// get your key from app.tomorrow.io/development/keys
const apikey = process.env.REACT_APP_TOMORROW_API_KEY;

// pick the location, as a latlong pair
let location = [40.758, -73.9855];

// list the fields
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

// choose the unit system, either metric or imperial
const units = "imperial";

// set the timesteps, like "current", "1h" and "1d"
const timesteps = ["current","1h", "1d"];

// configure the time frame up to 6 hours back and 15 days out
const now = moment.utc();
const startTime = moment.utc(now).add(0, "minutes").toISOString();
const endTime = moment.utc(now).add(7, "days").toISOString();

// specify the timezone, using standard IANA timezone format
const timezone = "America/New_York";

// request the timelines with all the query string parameters as options
const getTimelineParameters =  queryString.stringify({
    apikey,
    location,
    fields,
    units,
    timesteps,
    startTime,
    endTime,
    timezone,
}, {arrayFormat: "comma"});

const getWeatherData = async () => {
    try {
        const response = await fetch(getTimelineURL + "?" + getTimelineParameters, {method: "GET", compress: true})
        const data = await response.json()
        console.log(data)
        setCurrentData(data.timelines[2].intervals)
        setHourlyData(data.timelines[1].intervals.slice(0,24))
        setDailyData(data.timelines[0].intervals)
    } catch (err) {
        console.log(err)
    }
}
// getWeatherData()

const [hourlyData, setHourlyData] = useState({}) 
const [dailyData, setDailyData] = useState({}) 
const [currentData, setCurrentData] = useState({})


useEffect(() => {
    setCurrentData(weatherData.data.timelines[2].intervals)
    setHourlyData(weatherData.data.timelines[1].intervals.slice(0,24))
    setDailyData(weatherData.data.timelines[0].intervals)
},[])


    return (
        <Background>
            <Container>
                
                <Header 
                    data={currentData}/>

                <SearchBar />

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