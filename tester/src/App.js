import React from "react";
import axios from 'axios';
import BusMap from "./component/BusMap";
import './App.scss';

const baseUrl = `http://localhost:8080/agencies/ttc/vehicles`

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

  // getVehicle = () => { // keep it here for now for testing purposes
  //   axios.get(baseUrl)
  //   .then(info => {
  //     console.log(info)
  //   })
  // }
  async getVehicle(){
    try{
      console.log('getting')
      let x = await axios.get(baseUrl);
      this.setState({
        vehicle: x
      })
    }
    catch(error){
      console.log(error)
    }
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
    this.getVehicle();
  }

  render () {
    
    return (
      <>
        <BusMap state={this.state} />
      </>
    )
  }
}
