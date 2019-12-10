import React, {useState} from "react";
import ioClient from "socket.io-client";
// endpoint GET /socket.io/socket.io.js
import BusMap from "./component/BusMap";
import './App.scss';
import Search from "./component/Search/Search";
import Modal from "./component/Modal";
import Tour2 from "./component/Tour";

// const socket = ioClient('http://localhost:8080/') // change to localhost
const socket = ioClient(`${process.env.REACT_APP_SERVER || ''}`);

export default function App() {
  const [mapCenter, setMapCenter] = useState({
      lat: 43.66, // does this have to be array of object? 
      lng: -79.38,
      zoom: 14
  })
  const [userLocation, setUserLocation] = useState({
    lat: 43.66,
    lng: -79.38,
    haveUserLocation: false // intital state is userIcon doesn't show
  })
  const [bus, setBus] = useState({});
  const [busPath, setBusPath] = useState({});
  const [busStop, setBusStop] = useState({});
  const [busSuggestion, setBusSuggestion] = useState([]);
  const [dirSuggestion, setDirSuggestion] = useState([]);
  const [routeId, setRouteId] = useState("");
  const [stopSuggestion, setStopSuggestion] = useState([]);
  const [stopPredict, setStopPredict] = useState([]);
  const [modalSwitch, setModalSwitch] = useState(true);
  const [tourSwitch, setTourSwitch] = useState(false);

  const modalHandle = (e) => {
    e.preventDefault();
    setModalSwitch(!modalSwitch);
  }

  const tourHandle = (e) => {
    e.preventDefault();
    setTourSwitch(!tourSwitch);
    // turn off modal at the same time
    if (modalSwitch){
      setModalSwitch(!modalSwitch);
    }
  }
  
  // console.log(position); // RETURN {coords: Coordinates, timestamp: 1574897414197}
  if(!userLocation.haveUserLocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          haveUserLocation: true // intital state is userIcon doesn't show
        })
        setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 16
        })
      })
  }

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
    // if event came directly from the input
    // console.log('the target for search POST was: ', e.target);
    if(e.target.value.length) {
      socket.emit('search submit', e.target.value)
    // it came from the form
    } else if (e.target.routeSearch && e.target.routeSearch.value) {
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
    // if no value don't emit 
    if (value) { 
      socket.binary(false).emit('stop submit', [value[e.target.value], routeId]);
    } 
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
    setMapCenter({
      lat: data[1].lat,
      lng: data[1].lon,
      zoom: 18})
  })
  

  const busProps = {bus, mapCenter, userLocation, busPath, busStop};
  const searchProps = {routeSearch, searchPOST, busSuggestion, dirSuggestion, dirPOST, routeId, stopSuggestion, stopPOST, stopPredict}

  return(
    <main className="main">
      <Search searchProps={searchProps} />
      <Tour2 tourHandle={tourHandle} tourSwitch={tourSwitch} />
      <Modal modalHandle={modalHandle} modalSwitch={modalSwitch} tourHandle={tourHandle} />
      <button className="modal__open" onMouseOver={modalHandle}>INFO</button>
      <BusMap {...busProps} />
    </main>
  );
}

