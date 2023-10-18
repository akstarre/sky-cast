import React, { useContext } from "react";
import { CitiesContext } from "../context/citiesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  border-radius: 5px;
  border: none;
  background-color: #f5f5f5;
  padding: 0.25rem 1.25rem 0.25rem 2.5rem;
  width: 80%;
  margin: 5%;
  height: 30px;
  outline: none;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  color: gray;
`;

const CityForm = () => {
  const { value, error, handleSubmit, handleChange } = useContext(
    CitiesContext
  );

  return (
    <form onSubmit={handleSubmit}>
      <SearchContainer>
        <SearchInput
          onChange={handleChange}
          type="text"
          value={value}
          placeholder={"Current Location..."}
        />
        <SearchIcon icon={faSearch} size={"sm"} />
      </SearchContainer>
      <span>{error && error.toString()}</span>
    </form>
  );
};

export default CityForm;
