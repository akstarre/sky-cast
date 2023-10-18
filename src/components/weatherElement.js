import React, { useContext } from "react";
import { CitiesContext } from "../context/citiesContext";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const StyledContainer = styled.div`
  background-color: white;
  height: 19.5vh;
  width: 35vw;
  margin-bottom: 1px;
  padding: 5% 10%;
  flex: 1;
  z-index: 1;

  h3 {
    margin: 0;
  }
  span {
    font-size: 0.75rem;
  }
`;

const WeatherElementContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IconImageDiv = styled.div`
  height: 60px;
`;

const WeatherElement = ({ icon, name, weather, unit }) => {
  const { isLoading } = useContext(CitiesContext);

  return (
    <StyledContainer>
      <IconImageDiv>
        <img
          src={`/images/weather/${icon}`}
          alt={""}
          style={{ height: "100%" }}
        />
      </IconImageDiv>
      <WeatherElementContainer>
        <h3>{name}</h3>
        <h3>
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            `${weather}${unit}`
          )}
        </h3>
      </WeatherElementContainer>
      <div>
        <span>
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} spin />
          ) : (
            `This section represents the ${name.toLowerCase()} in your local area. Right now your area is experiencing ${weather}${unit} ${name.toLowerCase()}.`
          )}
        </span>
      </div>
    </StyledContainer>
  );
};

export default WeatherElement;
