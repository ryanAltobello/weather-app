import React from "react";

class LocationTime extends React.Component {
  getTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPM = "";
    if (hours >= 12) {
      amPM = "PM";
      hours = hours - 12;
    } else {
      amPM = "AM";
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    return { hours, minutes, amPM };
  }

  render() {
    const { hours, minutes, amPM } = this.getTime();
    // const { hours, minutes, amPM } = this.state;
    const city = this.props.location.city[0].address_components[0].long_name;
    const state = this.props.location.city[0].address_components[2].short_name;
    return (
      <div className="location-time">
        <div className="location">{`${city}, ${state}`}</div>
        <div className="time">{`${hours}:${minutes} ${amPM}`}</div>
      </div>
    );
  }
}

export default LocationTime;
