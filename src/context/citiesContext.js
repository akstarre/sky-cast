import axios from "axios";
import React, { useState, useEffect, createContext } from "react";
import { useHistory } from "react-router-dom";
import { uid } from "uid";

export const CitiesContext = createContext();

export const CitiesProvider = ({ children }) => {
  const history = useHistory();

  const [cities, setCities] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [currentCity, setCurrentCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("Imperial");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateTemps = async () => {
      for (let city of cities) {
        await fetchWeather(city.lat, city.lon, city);
      }
      if (currentCity) {
        await fetchWeather(currentCity.lat, currentCity.lon, currentCity);
      }
    };
    updateTemps();
  }, [units]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const setCityStorage = (cities) => {
    window.localStorage.setItem("cityList", JSON.stringify(cities));
  };

  const getCity = (id) => {
    return cities.find((city) => city.id === id);
  };

  const deleteCity = (id) => {
    const newCities = cities.filter((city) => {
      return city.id !== id;
    });
    setCities(newCities);
    setCityStorage(newCities);
  };

  const convertTime = (unix) => {
    const date = new Date(unix * 1000);
    return date;
  };

  const getTempUnit = () => {
    return units === "Imperial" ? "F" : "C";
  };

  useEffect(() => {
    setCities(JSON.parse(window.localStorage.getItem("cityList")) || []);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      value &&
      !cities.some((city) => city.city.toLowerCase() === value.toLowerCase())
    ) {
      try {
        const { data } = await axios(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=1&appid=0d546a87e1e697caee95ae91ac839627`
        );
        if (data.length > 0) {
          const { name, country, lat, lon } = data[0];
          const countryFlag_Url = `https://flagsapi.com/${country}/shiny/64.png`;
          const newCities = [
            ...cities,
            {
              city: name,
              country: country,
              countryFlagUrl: countryFlag_Url,
              lat: lat,
              lon: lon,
              id: uid()
            }
          ];
          setCities(newCities);
          setCityStorage(newCities);
          setValue("");
          setError("");
          history.push(`/city/${newCities[newCities.length - 1].id}`);
        } else {
          setError("You did not enter a City, please try again.");
          setValue("");
        }
      } catch (err) {
        console.error(err);
        setError(
          "Whoops, something went wrong. Please try again in a few minutes."
        );
        setValue("");
      }
    } else {
      setValue("");
      setError("Looks like you already added that City..");
    }
  };

  const fetchWeather = async (lat, lon, selectedCity) => {
    setIsLoading(true);
    const apiKey = "0d546a87e1e697caee95ae91ac839627";

    try {
      const { data } = await axios(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );

      const weatherObject = {
        current: {
          id: uid(),
          name: selectedCity?.city,
          temp: data.current.temp,
          rain: data.current.rain,
          humidity: data.current.humidity,
          clouds: data.current.clouds,
          wind: data.current.wind_speed,
          sunset: data.current.sunset,
          sunrise: data.current.sunrise,
          high: data.daily[0].temp.min,
          low: data.daily[0].temp.max,
          feelsLike: data.current.feels_like,
          time: convertTime(data.current.dt)
        },
        hourly: data.hourly.slice(0, 12).map((hour) => {
          new Date(convertTime(hour.dt));
          hour.time = convertTime(hour.dt).getHours();
          hour.icon = hour.weather[0].icon;
          return hour;
        })
      };
      const newCities = cities.map((city) => {
        if (selectedCity && city.id === selectedCity.id) {
          city.temp = data.current.temp;
        }
        return city;
      });

      setCities(newCities);
      setIsLoading(false);
      return weatherObject;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        value,
        error,
        handleSubmit,
        handleChange,
        getCity,
        deleteCity,
        convertTime,
        setCities,
        setCityStorage,
        currentCity,
        setCurrentCity,
        weather,
        setWeather,
        fetchWeather,
        units,
        setUnits,
        getTempUnit,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
