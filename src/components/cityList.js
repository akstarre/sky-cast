import React, { useContext } from "react";
import { CitiesContext } from "../context/citiesContext";
import styled from "styled-components";
import City from "./city";

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;

  padding-right: 5%;
  width: 95%;
`;

const CityList = () => {
  const { cities } = useContext(CitiesContext);

  return (
    <StyledList>
      {cities.map((city) => (
        <City city={city} isCurrent={false} key={city.id} />
      ))}
    </StyledList>
  );
};

export default CityList;
