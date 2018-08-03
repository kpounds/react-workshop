////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Create a <GeoPosition> component that encapsulates the geo state and
//   watching logic and uses a render prop to pass the coordinates back to
//   the <App>
//
// Got extra time?
//
// - Create a <GeoAddress> component that translates the geo coordinates to a
//   physical address and prints it to the screen (hint: use
//   `getAddressFromCoords`)
// - You should be able to compose <GeoPosition> and <GeoAddress> beneath it to
//   naturally compose both the UI and the state needed to render it
////////////////////////////////////////////////////////////////////////////////
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import getAddressFromCoords from "./utils/getAddressFromCoords";
import LoadingDots from "./LoadingDots";

// getAddressFromCoords(lat, lng).then(address => ...)

class GeoPosition extends React.Component {
  state = {
    coords: {
      latitude: null,
      longitude: null
    },
    error: null
  };

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
      },
      error => {
        this.setState({ error });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId);
  }
  render() {
    return this.props.children(
      this.state.coords.latitude,
      this.state.coords.longitude
    );
  }
}

class GeoAddress extends React.Component {
  state = { address: null };

  fetchAddress() {
    const { latitude, longitude } = this.props;

    if (latitude && longitude) {
      getAddressFromCoords(latitude, longitude).then(address => {
        this.setState({ address });
      });
    }
  }

  componentDidMount() {
    this.fetchAddress();
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.latitude !== prevProps.latitude ||
      this.props.longitude !== prevProps.longitude
    ) {
      this.fetchAddress();
    }
  }

  render() {
    return this.props.children(this.state.address);
  }
}

class App extends React.Component {
  renderAddress = address => {
    return <dd>{address}</dd>;
  };
  renderPosition = (lat, lng) => {
    return (
      <dl>
        <dt>Latitude</dt>
        <dd>{lat || <LoadingDots />}</dd>
        <dt>Longitude</dt>
        <dd>{lng || <LoadingDots />}</dd>
        <dt>Address</dt>
        <GeoAddress latitude={lat} longitude={lng}>
          {this.renderAddress}
        </GeoAddress>
      </dl>
    );
  };
  render() {
    return (
      <div>
        <h1>Geolocation</h1>
        <GeoPosition>{this.renderPosition}</GeoPosition>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
