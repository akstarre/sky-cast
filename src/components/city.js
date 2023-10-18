import React, { useContext } from "react";
import { CitiesContext } from "../context/citiesContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const CityContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 15rem;
  height: 50px;
`;

const IconButton = styled.button`
  background-color: white;
  border: none;
  opacity: 0;
  transition: opacity 0.15s ease;

  &:hover {
  }
`;

const SpinnerIcon = styled(FontAwesomeIcon)`
  height: 30px;
  width: 57px;
`;

const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.25rem;
  margin-bottom: 0.25rem;
  border-left: 2.5px solid transparent;
  transition: border-left-color 0.15s ease;

  &:hover {
    border-left-color: #001f3f;
    .icon-button {
      opacity: ${(props) => (props.isCurrent ? "0" : "1")};
      cursor: ${(props) => (props.isCurrent ? "arrow" : "pointer")};
    }
  }
`;

const CountryFlag = styled.img`
  height: 50%;
  margin: 0.5rem;
`;

const CountryFlagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
  height: 30px;
  border-radius: 5px;
  background-color: #f5f5f5;
`;
const CountryName = styled.span`
  font-weight: bold;
  /* margin: 0 0.75rem; */
`;

const CityName = styled.span`
  margin-right: 0.75rem;
`;

const Temperature = styled.span`
  font-weight: bold;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const TrashIcon = styled(FontAwesomeIcon)`
  color: #ff6666;
`;

const City = ({ city, isCurrent }) => {
  const { deleteCity, getTempUnit, isLoading } = useContext(CitiesContext);

  return (
    <CityContainer>
      {isCurrent && <h5>Current City</h5>}
      <StyledListItem key={city.id} isCurrent={isCurrent}>
        <CountryFlagContainer>
          <CountryFlag src={city.countryFlagUrl} alt="Country Flag" />
        </CountryFlagContainer>
        {isCurrent ? (
          <StyledLink to={`/`}>
            <CountryName>{city.country}, </CountryName>
            <CityName>{city.city}</CityName>
          </StyledLink>
        ) : (
          <StyledLink to={`/city/${city.id}`}>
            <CountryName>{city.country}, </CountryName>
            <CityName>{city.city}</CityName>
          </StyledLink>
        )}
        <Temperature>
          {isLoading ? (
            <SpinnerIcon icon={faSpinner} spin />
          ) : (
            `${city.temp}°${getTempUnit()}`
          )}
        </Temperature>
        <IconButton
          className={"icon-button"}
          onClick={() => {
            deleteCity(city.id);
          }}
        >
          <TrashIcon icon={faTrash} />
        </IconButton>
      </StyledListItem>
    </CityContainer>
  );
};

export default City;
