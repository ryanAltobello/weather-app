import React from "react";
import { getWeather } from "../actions";
import { connect } from "react-redux";

let currentTemp = null,
  minimumTemp = null,
  maximumTemp = null,
  windSpeed = null,
  windDirection = "",
  dayOfWeek = "",
  weatherIcon = "";

class Day extends React.Component {
  componentDidMount() {
    if (this.props.forecast.length === 0) {
      this.props.getWeather(this.props.lat, this.props.long);
    }
  }

  setWindDirection(windDirectionDegrees) {
    if (windDirectionDegrees > 337.5 || windDirectionDegrees <= 22.5) {
      windDirection = "N";
    } else if (windDirectionDegrees <= 67.5) {
      windDirection = "NE";
    } else if (windDirectionDegrees <= 112.5) {
      windDirection = "E";
    } else if (windDirectionDegrees <= 157.5) {
      windDirection = "SE";
    } else if (windDirectionDegrees <= 202.5) {
      windDirection = "S";
    } else if (windDirectionDegrees <= 247.5) {
      windDirection = "SW";
    } else if (windDirectionDegrees <= 292.5) {
      windDirection = "W";
    } else if (windDirectionDegrees <= 337.5) {
      windDirection = "NW";
    }
    return windDirection;
  }

  setWeatherIcon(forecast) {
    let weatherIconArray = [];
    const dayArray = [];

    if (!forecast.length) {
      dayArray.push(forecast.weather[0].icon);
    } else {
      for (let i = 0; i < forecast.length; i++) {
        dayArray.push(forecast[i].weather[0].icon);
      }
    }

    if (forecast.length === 8) {
      weatherIconArray = dayArray.slice(2, 6);
    } else if (forecast.length === 7) {
      weatherIconArray = dayArray.slice(1, 5);
    } else if (forecast.length === 6) {
      weatherIconArray = dayArray.slice(0, 4);
    } else if (forecast.length === 5) {
      weatherIconArray = dayArray.slice(0, 3);
    } else if (forecast.length === 4 || forecast.length === 2) {
      weatherIconArray = dayArray.slice(0, 2);
    } else if (forecast.length === 3 || forecast.length === 1) {
      weatherIconArray = dayArray.slice(0, 1);
    }

    if (weatherIconArray.includes("13d") || weatherIconArray.includes("13n")) {
      weatherIcon = "13d";
    } else if (
      weatherIconArray.includes("11d") ||
      weatherIconArray.includes("11n")
    ) {
      weatherIcon = "11d";
    } else if (
      weatherIconArray.includes("10d") ||
      weatherIconArray.includes("10n")
    ) {
      weatherIcon = "10d";
    } else if (
      weatherIconArray.includes("09d") ||
      weatherIconArray.includes("09n")
    ) {
      weatherIcon = "09d";
    } else if (
      weatherIconArray.includes("50d") ||
      weatherIconArray.includes("50n")
    ) {
      weatherIcon = "50d";
    } else if (
      weatherIconArray.includes("04d") ||
      weatherIconArray.includes("04n")
    ) {
      weatherIcon = "04d";
    } else if (
      weatherIconArray.includes("03d") ||
      weatherIconArray.includes("03n")
    ) {
      weatherIcon = "03d";
    } else if (
      weatherIconArray.includes("02d") ||
      weatherIconArray.includes("02n")
    ) {
      weatherIcon = "02d";
    } else {
      weatherIcon = "01d";
    }
    return weatherIcon;
  }

  setDayOfWeek(dayCheck) {
    if (dayCheck === 0) {
      dayOfWeek = "Sunday";
    } else if (dayCheck === 1) {
      dayOfWeek = "Monday";
    } else if (dayCheck === 2) {
      dayOfWeek = "Tuesday";
    } else if (dayCheck === 3) {
      dayOfWeek = "Wednesday";
    } else if (dayCheck === 4) {
      dayOfWeek = "Thursday";
    } else if (dayCheck === 5) {
      dayOfWeek = "Friday";
    } else if (dayCheck === 6) {
      dayOfWeek = "Saturday";
    }
    return dayOfWeek;
  }

  tempSort(a, b) {
    return a - b;
  }

  renderHelper = () => {
    const forecast = this.props.forecast;

    if (this.props.forecast.length === 0 && !this.props.weather.main) {
      return <div>Loading...</div>;
    } else if (this.props.forecast.length === 0) {
      const weather = this.props.weather;
      const dayCheck = new Date(weather.dt * 1000).getDay();
      this.setDayOfWeek(dayCheck);
      currentTemp = weather.main.temp.toFixed(0);
      minimumTemp = weather.main.temp_min.toFixed(0);
      maximumTemp = weather.main.temp_max.toFixed(0);
      windSpeed = weather.wind.speed.toFixed(0);
      windDirection = "";
      this.setWeatherIcon(weather);
    } else {
      currentTemp = forecast[Math.floor(forecast.length / 2)].main.temp.toFixed(
        0
      );
      const dayCheck = new Date(forecast[0].dt * 1000).getDay();
      this.setDayOfWeek(dayCheck);

      const minTempArray = forecast
        .map(min => min.main.temp_min)
        .sort(this.tempSort);
      minimumTemp = minTempArray[0].toFixed(0);

      const maxTempArray = forecast
        .map(max => max.main.temp_max)
        .sort(this.tempSort);
      maximumTemp = maxTempArray[maxTempArray.length - 1].toFixed(0);

      const totalWindSpeed = forecast
        .map(speed => speed.wind.speed)
        .reduce((acc, value) => acc + value);
      windSpeed = (totalWindSpeed / forecast.length).toFixed(0);

      const totalWindDegrees = forecast
        .map(deg => deg.wind.deg)
        .reduce((acc, value) => acc + value);
      const windDirectionDegrees = (totalWindDegrees / forecast.length).toFixed(
        0
      );

      this.setWindDirection(windDirectionDegrees);
      this.setWeatherIcon(forecast);
    }
  };

  render() {
    this.renderHelper();
    return (
      <div className="day">
        <div className="day-date">{dayOfWeek}</div>
        <div className="weather-icon">
          <img
            alt="weather icon for daily condition"
            src={`https://openweathermap.org/img/w/${weatherIcon}.png`}
          />
        </div>
        <div className="current-temp">{currentTemp}&deg;</div>
        <div className="min-max">
          <div className="min">{minimumTemp}&deg; L</div>
          <div className="max">{maximumTemp}&deg; H</div>
        </div>
        <div className="wind">{`${windDirection} ${windSpeed}mph`}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    weather: state.weather
  };
};

export default connect(
  mapStateToProps,
  { getWeather }
)(Day);
