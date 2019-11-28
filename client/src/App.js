import React from "react";
import BusMap from "../component/BusMap";
import './App.scss';


export default class App extends React.Component {
  state = {
    userLocation: {
      lat: 43.66,
      lng: -79.38,
    },
    haveUserLocation: false, // intital state is userIcon doesn't show
    zoom: 13
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position); // RETURN {coords: Coordinates, timestamp: 1574897414197}
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        haveUserLocation: true, // update after getting the locaiton
      });
    })
  }

  render () {
    // set the position 

    return (
      <>
        <BusMap state={this.state} />
      </>
    )
  }
}
