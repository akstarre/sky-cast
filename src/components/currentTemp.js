import React, { useContext } from "react";
import styled from "styled-components";
import { CitiesContext } from "../context/citiesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const MainTemp = styled.div`
  font-size: 3em;
  font-weight: bold;
  color: white;
  margin-bottom: 10px;
`;

const CurrentTempContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  width: 45vw;
  padding: 20px 3vw;
  z-index: 1;
  background-color: white;

  h1 {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const BackgroundImage = styled.div`
  width: 100%;
  height: 220px;
  background-image: url("/images/clouds2.jpg");
  border: 1px solid #001f3f;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
`;

const DataOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const HighLowContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  font-size: 1.2em;
  color: #666;

  span {
    margin: 0 5px;
  }

  .high {
    color: white; // warm color for high temp
  }

  .low {
    color: white; // cool color for low temp
  }
`;

const FeelsLikeTemp = styled.div`
  font-size: 1.2em;
  color: white;
  margin-top: 10px;
`;

const SpinnerIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 35%;
  left: 15%;
  height: 30px;
  width: 57px;
`;

const CurrentTemp = ({ weather, isLocal }) => {
  const { getTempUnit, isLoading } = useContext(CitiesContext);

  return (
    <CurrentTempContainer>
      {isLocal ? (
        <h1>Your local Forecast</h1>
      ) : (
        <h1>Your {weather && weather.current.city} Forecast</h1>
      )}
      <BackgroundImage>
        {isLoading ? (
          <SpinnerIcon icon={faSpinner} spin />
        ) : (
          <DataOverlay>
            <div>
              <MainTemp>
                {weather?.current.temp}°{getTempUnit()}
              </MainTemp>

              <HighLowContainer>
                <div className="high">
                  <span>↑</span> {weather?.current.high}°{getTempUnit()}
                </div>
                <div className="low">
                  <span>↓</span> {weather?.current.low}°{getTempUnit()}
                </div>
              </HighLowContainer>

              <FeelsLikeTemp>
                Feels like {weather?.current.feelsLike}°{getTempUnit()}
              </FeelsLikeTemp>
            </div>
          </DataOverlay>
        )}
      </BackgroundImage>
    </CurrentTempContainer>
  );
};

export default CurrentTemp;
