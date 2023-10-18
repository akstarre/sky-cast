import React, { useContext } from "react";
import { CitiesContext } from "../context/citiesContext";
import City from "./city";

const CurrentCity = () => {
  const { currentCity } = useContext(CitiesContext);

  return (
    <div>{currentCity && <City city={currentCity} isCurrent={true} />}</div>
  );
};

export default CurrentCity;
