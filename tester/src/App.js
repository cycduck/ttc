import React, {useState, useEffect} from "react";
import ioClient from "socket.io-client";
// endpoint GET /socket.io/socket.io.js
import BusMap from "./component/BusMap";
import './App.scss';
import Search from "./component/Search/Search";


const socket = ioClient('http://localhost:8080/') // change to localhost

export default function App() {
  const [userLocation, setUserLocation] = useState({
      lat: 43.66, // does this have to be array of object? 
      lng: -79.38,
      haveUserLocation: false, // intital state is userIcon doesn't show
      zoom: 14,
  })
  const [bus, setBus] = useState({});
  const [busPath, setBusPath] = useState({});
  const [busStop, setBusStop] = useState({})
  const [busSuggestion, setBusSuggestion] = useState([]);
  const [dirSuggestion, setDirSuggestion] = useState([]);
  const [routeId, setRouteId] = useState("");
  const [stopSuggestion, setStopSuggestion] = useState([]);
  const [stopPredict, setStopPredict] = useState([])

  navigator.geolocation.getCurrentPosition((position)=>{
    // console.log(position); // RETURN {coords: Coordinates, timestamp: 1574897414197}
    setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
      haveUserLocation: true, // intital state is userIcon doesn't show
      zoom: 16,
    })
  })

  socket.on('busUpdate', data=>{
    console.log('bus marker updating from socket', data);
    setBus(data); // Not need to put data into it's {} or will become props.vehicle.data.v505
  });
  socket.binary(false).on('busPath', data => {
    console.log('bus path updating from socket', data);
    setBusPath(data);
  });

  const routeSearch = (e)=> {
      console.log('searching bus route ', e.target.value);
      socket.emit('search input', e.target.value);
  }
  socket.on('search suggestion', data => {
    setBusSuggestion(data)
  })
  const searchPOST =(e) => {
    e.preventDefault();
    if(e.target.value ) {
      socket.emit('search submit', e.target.value)
    } else if (e.target.routeSearch.value) {
      socket.emit('search submit', e.target.routeSearch.value)
    }
    // when typed u it breaks ???
  }
  socket.on('direction suggestion', data => {
    setDirSuggestion(data[0]);
    setRouteId(data[1]);
  })
  const dirPOST =(e)=>{
    console.log('searching direction ', e.target.value);
    socket.emit('direction input', [e.target.value, routeId])
  }
  socket.on('stop suggestion', data => {
    setStopSuggestion(data);
  })
  const stopPOST =(e)=>{
    let value = stopSuggestion.find(info => Object.keys(info)[0]=== e.target.value);
    socket.binary(false).emit('stop submit', [value[e.target.value], routeId]);
  }
  socket.on('prediction', data => {
    console.log('getting predictions')
    let convert = []
    data[0].forEach(info => {
      let time = new Date(info)
      let date = new Date();
      let difference = Math.floor((time.getTime() - date.getTime())/1000/60);
      convert.push(difference);
    })
    setStopPredict(convert);
    setBusStop(data[1])
  })
  

  const busProps = {bus, userLocation, busPath, busStop};
  const searchProps = {routeSearch, searchPOST, busSuggestion, dirSuggestion, dirPOST, routeId, stopSuggestion, stopPOST, stopPredict}

  return(
    <main className="main">
      <Search searchProps={searchProps} />
      <BusMap {...busProps} />
    </main>
  );
}

