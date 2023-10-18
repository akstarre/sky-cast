import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 200;
  word-wrap: wrap;
`;

const TitleContainer = styled.div`
  width: 45%;
  margin: 2.5%;
`;

const TextContainer = styled.div`
  font-size: 1rem;
  font-weight: 200;
  width: 30%;
  margin: 2.5%;
  padding-top: 2.5%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  height: 30vh;
  background-color: white;
  margin: 2px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <TitleContainer>
        <Title>Your trusted source for world wide weather forecasts</Title>
      </TitleContainer>
      <TextContainer>
        SkyCast is a react-based application built on OpenWeather's API to
        deliver fast and accurate weather forcasts down to the hour.
      </TextContainer>
    </HeaderContainer>
  );
};

export default Header;
