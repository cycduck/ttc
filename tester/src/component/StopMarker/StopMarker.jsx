import React from "react";
import L from 'leaflet';
import {Marker, Popup} from 'react-leaflet';
import ttcLogo from '../../assets/icon/stop.svg';

const stopIcon = L.icon({
  iconUrl: ttcLogo,
  iconSize: [80,80],
  popupAnchor: [-5, 15]
})

export default function StopMarker(props) {
  const {busStop} = props;
  console.log(busStop)
  
  return(
    <Marker
      icon={stopIcon}
      position={[busStop.lat,busStop.lon]}
      className="map__stop"
    >
      <Popup>
        <p>Stop name: {busStop.title}</p>
      </Popup>
    </Marker>
  )
  
}