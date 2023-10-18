import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { CitiesContext } from "../../context/citiesContext";
import HourlyWeather from "../../components/hourlyWeather";
import WeatherElement from "../../components/weatherElement";
import { uid } from "uid";
import CurrentTemp from "../../components/currentTemp";

const HomeContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0.1px;
`;
const WeatherContainer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;
const CurrentWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HourlyWeatherContainer = styled.div`
  display: flex;
`;

const Home = ({ match }) => {
  const { currentCity, setCurrentCity, fetchWeather, units } = useContext(
    CitiesContext
  );

  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [cityLoading, setCityLoading] = useState(true);
  const [weather, setWeather] = useState(null);

  const owApi_key = "0d546a87e1e697caee95ae91ac839627";

  useEffect(() => {
    const fetchUserWeatherAndCity = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const newWeather = await fetchWeather(lat, lon);
            const newCity = await fetchCurrentCity(lat, lon);
            newCity.temp = newWeather.current.temp;
            newCity.lat = lat;
            newCity.lon = lon;
            setWeather(newWeather);
            setCurrentCity(newCity);

            setCoordinates({
              lat: position.coords.latitude,
              lon: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } else {
        console.log("Geolocation not available");
      }
    };

    fetchUserWeatherAndCity();
  }, [units]);

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      fetchWeather(coordinates.lat, coordinates.lon);
    }
  }, [cityLoading, units]);

  const fetchCurrentCity = async (lat, lon) => {
    try {
      const { data } = await axios(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${owApi_key}`
      );
      const cityObject = {
        city: data[0].name,
        country: data[0].country,
        countryFlagUrl: `https://flagsapi.com/${data[0].country}/shiny/64.png`,
        id: uid()
      };

      setCityLoading(false);

      return cityObject;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <HomeContainer>
      <WeatherContainer>
        <CurrentWeatherContainer>
          <CurrentTemp weather={weather} isLocal={true} />
          <HourlyWeatherContainer>
            <HourlyWeather weather={weather ? weather.hourly : []} />
          </HourlyWeatherContainer>
        </CurrentWeatherContainer>
        <div>
          <WeatherElement
            name={"Rain"}
            icon={"rain-icon.png"}
            weather={weather?.current.rain ? weather.current.rain["1h"] : 0}
            unit={units === "Imperial" ? "in" : "mm"}
          >
            Rain
          </WeatherElement>
          <WeatherElement
            name={"Clouds"}
            icon={"cloud-icon.png"}
            weather={weather?.current.clouds}
            unit={"%"}
          >
            Wind
          </WeatherElement>
          <WeatherElement
            name={"Wind"}
            icon={"wind-icon.png"}
            weather={weather?.current.wind}
            unit={units === "Imperial" ? "mph" : "km/h"}
          >
            humidity
          </WeatherElement>
          <WeatherElement
            name={"Humidity"}
            icon={"humidity-icon.png"}
            weather={weather?.current.humidity}
            unit={"%"}
          >
            Clouds
          </WeatherElement>
        </div>
      </WeatherContainer>
    </HomeContainer>
  );
};

export default Home;
