import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import City from "./pages/City";
import { CitiesProvider } from "./context/citiesContext";
import styled, { createGlobalStyle } from "styled-components";
import Navigation from "./components/navigation";
import Header from "./components/header";

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    color: #001f3f;
    box-sizing:border-box
}
`;

const MainLayout = styled.div`
  display: flex;
  background-color: #f5f5f5;
  height: 100vh;
  width: 100vw;
`;

const SubLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <MainLayout>
          <CitiesProvider>
            <Navigation />
            <SubLayout>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/city/:cityId" component={City} />
              </Switch>
            </SubLayout>
          </CitiesProvider>
        </MainLayout>
      </Router>
    </>
  );
}
export default App;
