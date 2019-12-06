import React from "react";
import L from 'leaflet';
import {Marker, Popup} from 'react-leaflet';
import ttcLogo from '../../assets/icon/stop.svg';

const stopIcon = L.icon({
  iconUrl: ttcLogo,
  iconSize: [30,30],
  popupAnchor: [-5, 15]
})

export default function StopMarker(props) {
  const {busStop} = props;
  
  console.log(busStop)
  if(Object.keys(busStop).length > 0){
    return Object.values(busStop).map(route => {
      route.stops.map(info => {
        // console.log('working')
        return(
          <Marker
            icon={stopIcon}
            position={[info.lat,info.lon]}
            className="stop"
          >
            <Popup>
              <p>Route: {info.id}</p>
              <p>Stop name: {info.title}</p>
            </Popup>
          </Marker>
        )

      })
      
    })
  }

  
  
}