import styled from "styled-components";
import CityForm from "./cityForm";
import CityList from "./cityList";
import Logo from "./logo";
import CurrentCity from "./currentCity";
import UnitsButton from "./unitsButton";

const StyledNav = styled.nav`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  background-color: white;
`;

const Navigation = () => {
  return (
    <StyledNav>
      <Logo />
      <UnitsButton />
      <CurrentCity />
      <CityForm />

      <CityList />
    </StyledNav>
  );
};

export default Navigation;
