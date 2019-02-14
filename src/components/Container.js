import React from "react";
import { connect } from "react-redux";
import { getLocation } from "../actions";
import LocationTime from "./LocationTime";
import Forecast from "./Forecast";

import "./App.css";

class Container extends React.Component {
  componentDidMount() {
    this.props.getLocation();
  }

  renderHelper = () => {
    if (this.props.error) {
      return (
        <div className="no-location">
          Please allow geolocation to see weather data!
        </div>
      );
    } else {
      if (!this.props.cityState.city) {
        return <div>Loading...</div>;
      } else {
        return (
          <div className="container">
            <div className="photo-credit">
              Photo by{" "}
              <a
                href={`${
                  this.props.photoProfile.links.html
                }?utm_source=weather_apputm_medium=referral`}
              >
                {this.props.photoName.name}
              </a>{" "}
              on{" "}
              <a href="https://unsplash.com/?utm_source=weather_app&utm_medium=referral">
                Unsplash
              </a>
            </div>
            <LocationTime location={this.props.cityState} />
            <Forecast location={this.props.latLong} />
          </div>
        );
      }
    }
  };

  render() {
    return this.renderHelper();
  }
}

const mapStateToProps = state => {
  if (state.location.message) {
    return {
      error: state.location.message
    };
  } else {
    return {
      cityState: {
        city: state.location.results,
        state: state.location.results
      },
      latLong: {
        lat: state.location.results,
        long: state.location.results
      }
    };
  }
};

export default connect(
  mapStateToProps,
  { getLocation }
)(Container);
