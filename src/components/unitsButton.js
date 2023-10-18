import React, { useContext } from "react";
import styled from "styled-components";
import { CitiesContext } from "../context/citiesContext";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ToggleButton = styled.div`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: #eee;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.units === "Imperial" ? "flex-start" : "flex-end"};
  cursor: pointer;
  transition: 0.3s ease;
  position: relative;
`;

const Circle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: #333;
`;

const UnitsMessage = styled.span`
  font-size: 0.75rem;
`;

const UnitsButton = () => {
  const { units, setUnits } = useContext(CitiesContext);

  const toggleUnits = () => {
    setUnits((prev) => (prev === "Metric" ? "Imperial" : "Metric"));
  };

  return (
    <ButtonContainer>
      <UnitsMessage>Displaying {units} units</UnitsMessage>
      <ToggleButton units={units} onClick={toggleUnits}>
        <Circle></Circle>
      </ToggleButton>
    </ButtonContainer>
  );
};

export default UnitsButton;
