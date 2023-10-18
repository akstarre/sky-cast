import React from "react";
import styled from "styled-components";

const LogoDiv = styled.div`
  height: 175px;
`;

const LogoImage = styled.img`
  height: 100%;
`;

const Logo = () => {
  return (
    <LogoDiv>
      <LogoImage src={"/images/SkyCast-Light.png"} alt={""} />
    </LogoDiv>
  );
};

export default Logo;
