import { useEffect } from "react";
import moment from "moment";
import queryString from "query-string";
import Background from "./Background";
import Container from "./Container";
import Forecast from "./Forecast";
import Header from "./Header";
import SearchBar from "./SearchBar";
import { useState } from "react";
import Geocode from "react-geocode";
import weatherData from "../data.json"

export default function Home() {
  var qs = require("qs");
  const [isLoading, setLoading] = useState(false);
  const [hourlyData, setHourlyData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [currentData, setCurrentData] = useState({});
  const [address, setAddress] = useState([]);
  const [latLong, setLatLong] = useState([40.712775, -74.005973]);

  const baseWeatherUrl = "https://weather.googleapis.com/v1";
  const requestType = "/forecast/days:lookup";
  const queryParams = qs.stringify(
    {
      key: process.env.REACT_APP_MAPS_API_KEY,
      location: { latitude: 40.712775, longitude: -74.005973 },
    },
    {
      allowDots: true,
    }
  );

  const getWeatherData = async () => {
    try {
      // setLoading(true);
      // const response = await fetch(
      //   `${baseWeatherUrl}${requestType}?${queryParams}`
      // );

      // const data = await response.json();
      const data = weatherData;
      console.log({data});
    } catch (e) {
      console.log(e);
    }
  };

  getWeatherData();

  // Geocode.setApiKey(process.env.REACT_APP_GMAPS_GEOCODING_API_KEY);
  // const getLatLong = async (location) => {
  //   try {
  //     const res = await Geocode.fromAddress(location);
  //     const address = await res.results[0].formatted_address;
  //     const { lat, lng } = await res.results[0].geometry.location;
  //     setAddress(address.replace(/[0-9]/g, "").split(","));
  //     setLatLong([lat, lng]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getLatLong(latLong);
  // }, []);

  // useEffect(() => {
  //   getWeatherData();
  // }, [latLong]);

  return (
    <Background data={currentData}>
      <Container isLoading={isLoading}>
        <Header data={currentData} address={address} />

        {/* <SearchBar getLatLong={getLatLong} /> */}

        <Forecast
          timeFrame={"HOURLY"}
          data={hourlyData}
          time={true}
          day={false}
          date={false}
          temp={true}
          tempRange={false}
        />

        <Forecast
          timeFrame={"DAILY"}
          data={dailyData}
          time={false}
          day={true}
          date={true}
          temp={false}
          tempRange={true}
        />
      </Container>
    </Background>
  );
}
