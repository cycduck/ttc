import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './busMap.scss';
import pin from '../../assets/icon/circle.svg';

const myIcon = L.icon({
  // iconUrl: 'https://emoji.slack-edge.com/T3N0S87QD/royleejr/139cae7d1da1ff64.png',
  iconUrl: pin, // the circle
  iconSize: [10,10],
  // iconAnchor: [-3, -76], // this is the margin, usually the TL corner is the tip
  popupAnchor: [-5, -15], // this is when you click on it
})

const userIcon = L.divIcon({
  className: 'map__user-icon',
  html: `<div class='map__user-icon-inner'></div>`,
  iconAnchor: [25,25]
});

export default class BusMap extends React.Component {
  // console.log(this.props.state.userLocation, this.props.state.zoom)

  render (){
    const {userLocation, zoom, haveUserLocation} = this.props.state;
    const userPosition = [userLocation.lat, userLocation.lng];
    return(
      <Map className="map" center={userPosition} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          haveUserLocation ?
          <Marker 
          icon={userIcon}
          position={userPosition}
          >
          </Marker>: ""
        }
          {/* https://react-leaflet.js.org/docs/en/components#marker */}
          <Marker 
          icon={myIcon}
          position={userPosition}
          >
          <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
          </Marker>
      </Map>
    )
  }
}
