import React from "react";
import {Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// https://stackoverflow.com/questions/48632123/what-do-the-angle-brackets-and-asterisk-mean-in-react


const yor = L.icon({
  iconUrl: 'https://emoji.slack-edge.com/T3N0S87QD/royleejr/139cae7d1da1ff64.png',
  iconSize: [30,30],
  // iconAnchor: [-3, -76], // this is the margin, usually the TL corner is the tip
  popupAnchor: [-5, -15], // this is when you click on it
})

const userIcon = L.divIcon({
  className: 'map__user-icon',
  html: `<div class='map__user-icon-inner'></div>`,
  iconAnchor: [25,25]
});

const markerRender = (data) =>{

    const {bus, clickMe}=data
    if (bus){
      return bus.map(info=> {

      const direction = `${info.directionId ? info.directionId : ""}`
      const busIcon = L.divIcon({
        className: `map__bus-icon-${info.routeId}`,
        html: `<p class='map__bus-icon-inner-${info.routeId}'>${info.routeId} <span class="map__bus-icon-span">${direction}</span></p>`,
        iconSize: [35,35],
        iconAnchor: [15,15]
      });

      return (
      <Marker 
        icon={busIcon}
        position={[info.lat, info.lng]}
        className="test"
        onClick={()=>{clickMe(`v${info.routeId}`)}}
        // can't do clickMe(), mask it in an arrow
      >
        <Popup>
          <p>Route: {info.routeId}</p>
          <p>Direction: {info.directionId}</p>
          <p>Coordinates: {info.lat}, {info.lng}</p>
        </Popup>
      </Marker>
      )
    })
  } 
}

export default function BusMarker(props) {

    return (
      <>{props.bus ? markerRender(props) : null}</>
    )

}