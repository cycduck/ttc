import React, {useState, useEffect} from "react";
import ioClient from "socket.io-client";
// endpoint GET /socket.io/socket.io.js
import BusMap from "./component/BusMap";
import './App.scss';


const socket = ioClient('http://localhost:8080/') // change to localhost

export default function App() {
  const [userLocation, setUserLocation] = useState({
      lat: 43.66, // does this have to be array of object? 
      lng: -79.38,
      haveUserLocation: false, // intital state is userIcon doesn't show
      zoom: 14,
  })
  const [vehicle, setVehicle] = useState({})
  const [busPath, setBusPath] = useState({})
  const [busStop, setBusStop] = useState({})

  navigator.geolocation.getCurrentPosition((position)=>{
    // console.log(position); // RETURN {coords: Coordinates, timestamp: 1574897414197}
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      haveUserLocation: true, // intital state is userIcon doesn't show
      zoom: 16,
    })
  })
  // useEffect(()=>{
  //   // sth runs every render
  // })

  socket.on('busUpdate', data=>{
    console.log('bus marker updating from socket', data);
    setVehicle(data); // Not need to put data into it's {} or will become props.vehicle.data.v505
  });
  socket.on('busPath', data => {
    console.log('bus path updating from socket', data);
    setBusPath(data);
  });
  socket.on('busStop', data=>{
    console.log('bus stop updating from socket', data);
    setBusStop(data);
  })

  const busProps = { vehicle, userLocation, busPath, busStop};

  return(
    <BusMap {...busProps} />
  );
}

