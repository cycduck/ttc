import React from "react";
import ioClient from "socket.io-client";
// endpoint GET /socket.io/socket.io.js
import BusMap from "./component/BusMap";
import './App.scss';

const socket = ioClient('http://localhost:8080/') // change to localhost

export default class App extends React.Component {
  state = {
    userLocation: {
      lat: 43.66,
      lng: -79.38,
    },
    haveUserLocation: false, // intital state is userIcon doesn't show
    zoom: 14,
    vehicle: {}
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
        zoom: 16
      });
    })
    
    socket.on('busUpdate', (data)=>{
      console.log('does socket work on client side?', data)
      this.setState({
        vehicle: data
      })
    })
      // this.getVehicle(); // gets it at 0s, then every 30s
      // setInterval(()=>this.getVehicle(), 10000); // the API changes every 30s
  }

  render () {
    
    return (
      <>
        <button onClick={this.addLayer()}></button>
        {/* <button onClick={this.removeLayer()}></button> */}
        <BusMap state={this.state} />
      </>
    )
  }
}
