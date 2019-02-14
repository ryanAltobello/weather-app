import React from "react";
import { connect } from "react-redux";
import Day from "./Day";
import { getForecast } from "../actions";

class Forecast extends React.Component {
  componentDidMount() {
    const lat = this.props.location.lat[0].geometry.location.lat;
    const long = this.props.location.long[0].geometry.location.lng;
    this.props.getForecast(lat, long);
    // this.props.getCurrentWeather(lat, long);
  }

  renderHelper = () => {
    if (!this.props.forecast.list) {
      return <div>Loading...</div>;
    } else {
      const testDay = new Date().getDate();
      let list = this.props.forecast.list;
      let today = [],
        secondDay = [],
        thirdDay = [],
        fourthDay = [],
        fifthDay = [];

      for (let i = 0; i < list.length; i++) {
        const listDay = new Date(list[i].dt * 1000).getDate();
        if (testDay === listDay) {
          today.push(list[i]);
        } else if (testDay + 1 === listDay) {
          secondDay.push(list[i]);
        } else if (testDay + 2 === listDay) {
          thirdDay.push(list[i]);
        } else if (testDay + 3 === listDay) {
          fourthDay.push(list[i]);
        } else if (testDay + 4 === listDay) {
          fifthDay.push(list[i]);
        }
      }
      return (
        <div className="forecast">
          <Day
            forecast={today}
            lat={this.props.location.lat[0].geometry.location.lat}
            long={this.props.location.long[0].geometry.location.lng}
          />
          <Day forecast={secondDay} />
          <Day forecast={thirdDay} />
          <Day forecast={fourthDay} />
          <Day forecast={fifthDay} />
        </div>
      );
    }
  };

  render() {
    return this.renderHelper();
  }
}

const mapStateToProps = state => {
  return {
    forecast: state.forecast
    // weather: state.weather
  };
};

export default connect(
  mapStateToProps,
  { getForecast }
)(Forecast);
