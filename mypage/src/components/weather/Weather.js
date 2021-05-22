import React, { useState, useEffect } from "react";
import { CircularProgress, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorOutlineOutlined } from "@material-ui/icons";
import "../../static/css/weather.css";
import { images } from "./weatherImages";
import { weatherApi } from "./fetchWeather";

const useStyles = makeStyles((theme) => ({
  root: {
    color:
      theme.palette.type === "light"
        ? theme.palette.secondary.main
        : theme.palette.primary.main,
  },
}));

const Weather = () => {
  const [tempData, setTempData] = useState({ error: null });
  const [isLoading, setIsLoading] = useState(true);

  const classes = useStyles();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (Success) => {
        const { latitude, longitude } = Success.coords;
        weatherApi(latitude, longitude, (response) => {
          if (!response.error) {
            setTempData({ ...response.data, error: null });
            setIsLoading(false);
          } else {
            setTempData({
              error: { isError: true, description: "Invalid API" },
            });
            setIsLoading(false);
          }
        });
      },
      (err) => {
        if (err) {
          setTempData({
            error: { isError: true, description: "Access Denied" },
          });
          setIsLoading(false);
        }
      }
    );
  }, []);

  const renderLoading = () => {
    return (
      <>
        {isLoading ? (
          <div className="weather-div-loader">
            <CircularProgress size={30} className={classes.root} />
          </div>
        ) : null}
      </>
    );
  };

  const RenderError = () => {
    return (
      <>
        {tempData.error && !isLoading ? (
          <div className="weather-error">
            <ErrorOutlineOutlined color="error" />
            <Typography>{tempData.error.description}</Typography>
          </div>
        ) : null}
      </>
    );
  };

  const renderWeather = () => {
    if (!isLoading && !tempData.error) {
      return (
        <div className="weather-success">
          <div className="weather-inner">
            <img
              className="weather-image"
              src={images[`${tempData.imgCode}.png`].default}
              alt=""
            ></img>
            <Typography variant={"h5"}>{tempData.temp}° F </Typography>
          </div>
        </div>
      );
    }
  };
  return (
    <div className="weather-div">
      {renderLoading()}
      {RenderError()}
      {renderWeather()}
    </div>
  );
};

export default Weather;
