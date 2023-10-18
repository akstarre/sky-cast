import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CitiesContext } from "../../context/citiesContext";
import HourlyWeather from "../../components/hourlyWeather";
import WeatherElement from "../../components/weatherElement";
import CurrentTemp from "../../components/currentTemp";

const CityContainer = styled.div`
  height: 100%;
  width: 100%;
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

const City = ({ match }) => {
  const { getCity, fetchWeather, units } = useContext(CitiesContext);

  const [weather, setWeather] = useState(null);
  console.log(match);

  useEffect(() => {
    const fetchAndUpdateWeather = async () => {
      let selectedCity = getCity(match.params.cityId);
      if (selectedCity) {
        const newWeather = await fetchWeather(
          selectedCity.lat,
          selectedCity.lon,
          selectedCity
        );
        setWeather(newWeather);
      }
    };
    fetchAndUpdateWeather();
  }, [match.params.cityId, units]);

  return (
    <CityContainer>
      <WeatherContainer>
        <CurrentWeatherContainer>
          <CurrentTemp weather={weather} isLocal={false} />
          <HourlyWeatherContainer>
            <HourlyWeather
              weather={weather ? weather.hourly : []}
              sunset={weather?.current.sunset}
              sunrise={weather?.current.sunrise}
            />
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
    </CityContainer>
  );
};

export default City;
