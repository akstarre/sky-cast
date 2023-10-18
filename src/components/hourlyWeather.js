import React, { useContext } from "react";
import styled from "styled-components";
import { CitiesContext } from "../context/citiesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Area, XAxis, YAxis, Tooltip, ComposedChart, Bar } from "recharts";

const HourlyWeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 38.1vh;
  width: 45vw;
  padding: 20px 3vw;
  margin: 2px;
  z-index: 1;
  background-color: white;

  h1 {
    font-size: 1.5em;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const ChartContainer = styled.div`
  position: relative;
  height: 320px;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #001f3f;

    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-track {
    background: #e6f0f8;
    border-radius: 5px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  }
`;

const ChartContent = styled.div`
  display: flex;
  width: ${(props) => props.totalWidth || "auto"};
`;

const HourlyWeatherDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  min-width: 79.8px;
  padding: 10% 0;
  opacity: 0.75;
  transform: translateY(${(props) => props.verticalShift || 0}px);

  span {
    width: 50px;
  }
`;

const ContentWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const SpinnerIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 25%;
  left: 40%;
  height: 30px;
  width: 57px;
`;

const HourlyWeather = ({ weather }) => {
  const { getTempUnit, isLoading, convertTime } = useContext(CitiesContext);

  const convertWeatherTime = (time) => {
    if (time > 12) {
      time = `${time - 12}pm`;
    } else if (time === 0 || time === 12) {
      switch (time) {
        case 0:
          time = "12am";
          break;
        case 12:
          time = "12pm";
          break;
        default:
      }
    } else {
      time = `${time}am`;
    }
    return time;
  };

  const lerp = (v0, v1, t) => {
    return (1 - t) * v0 + t * v1;
  };

  const tempFactor = 0.2;

  const getBarColor = (hour) => {
    const midday = 12;

    const startColor = { r: 6, g: 60, b: 92 };
    const endColor = { r: 135, g: 206, b: 235 };

    let factor;

    if (hour <= midday) {
      factor = hour / midday;
    } else {
      factor = 1 - (hour - midday) / midday;
    }

    const r = Math.round(lerp(startColor.r, endColor.r, factor));
    const g = Math.round(lerp(startColor.g, endColor.g, factor));
    const b = Math.round(lerp(startColor.b, endColor.b, factor));

    return `rgb(${r},${g},${b})`;
  };

  const totalWidth = weather.length * 80;

  const renderLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text
        x={x}
        y={y}
        dy={-10}
        fill="#001f3f"
        fontSize={12}
        textAnchor="middle"
      >
        {value}°{getTempUnit()}
      </text>
    );
  };

  const temperatures = weather.map((item) => item.temp);
  const minTemperature = Math.min(...temperatures);
  const maxTemperature = Math.max(...temperatures);

  return (
    <div>
      <HourlyWeatherContainer>
        <h1>Your Hourly Forecast</h1>

        <ChartContainer>
          <ChartContent totalWidth={`${totalWidth}px`}>
            {isLoading ? (
              <SpinnerIcon icon={faSpinner} spin />
            ) : (
              <ComposedChart width={totalWidth} height={256} data={weather}>
                <defs>
                  <linearGradient id="fadeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                    <stop offset="5%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity="1" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                <XAxis dataKey="time" tickFormatter={convertWeatherTime} />
                <YAxis
                  domain={[minTemperature - 10, maxTemperature + 10]}
                  hide={true}
                />

                <Tooltip />

                <Bar
                  dataKey="time"
                  barSize={120}
                  radius={[5, 5, 0, 0]}
                  shape={(props) => {
                    const originalX = props.x;
                    const originalY = 0;
                    const originalWidth = props.width;
                    const fullHeight = 220;
                    const borderRadius = 5;
                    const barColor = getBarColor(props.payload.time);

                    return (
                      <rect
                        x={originalX}
                        y={originalY + borderRadius}
                        width={originalWidth}
                        height={fullHeight - borderRadius}
                        fill={barColor}
                        rx={borderRadius}
                        ry={borderRadius}
                      />
                    );
                  }}
                  isAnimationActive={false}
                />

                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#001f3f"
                  fill="url(#colorTemp)"
                  dot={{ fill: "#001f3f", strokeWidth: 2 }}
                  label={renderLabel}
                />
              </ComposedChart>
            )}
            <ContentWrapper>
              {weather &&
                weather.map((weatherItem) => (
                  <HourlyWeatherDiv key={weatherItem.id}>
                    {isLoading ? (
                      <div></div>
                    ) : (
                      <img
                        src={`https://openweathermap.org/img/wn/${weatherItem.icon}@2x.png`}
                        alt=""
                      />
                    )}
                  </HourlyWeatherDiv>
                ))}
            </ContentWrapper>
          </ChartContent>
        </ChartContainer>
      </HourlyWeatherContainer>
    </div>
  );
};
export default HourlyWeather;
