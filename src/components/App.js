import React from "react";
import Container from "./Container";
import { connect } from "react-redux";
import { getBackgroundImage } from "../actions";

import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.props.getBackgroundImage();
  }

  renderHelper = () => {
    if (!this.props.image) {
      return <div>Loading...</div>;
    } else {
      return (
        <div
          className="app"
          style={{
            margin: "0",
            height: "100vh",
            width: "100vw",
            backgroundColor: "black",
            backgroundImage: `url(${this.props.image.raw}&w=1600)`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <Container
            photoProfile={this.props.photographerProfile}
            photoName={this.props.photographerName}
          />
        </div>
      );
    }
  };
  render() {
    return <div className="app">{this.renderHelper()}</div>;
  }
}
const mapStateToProps = state => {
  return {
    image: state.image.urls,
    photographerProfile: state.image.user,
    photographerName: state.image.user
  };
};

export default connect(
  mapStateToProps,
  { getBackgroundImage }
)(App);
