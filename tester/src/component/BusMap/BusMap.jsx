import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './busMap.scss';


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

export default class BusMap extends React.Component {
  // console.log(this.props.state.userLocation, this.props.state.zoom)

  markerRender = (data) =>{
    console.log(data)
    if (data){
      // console.log('before map', data.v505)
      return data.map(info=> {
        console.log('making Marker', data)
        const busIcon = L.divIcon({
          className: `map__bus-icon-${info.routeId}`,
          html: `<p class='map__bus-icon-inner-${info.routeId}'>${info.routeId}</p>`,
          iconSize: [30,30],
          iconAnchor: [15,15]
        });

        return (
        <Marker 
        icon={busIcon}
        position={[info.lat, info.lng]}
        className="test"
        >
          <Popup>
            <div>{info.routeId}</div>
        {info.directionId ? <div>Direction: {info.directionId}</div> : null}
          </Popup>
        </Marker>
        )
      })
    } 
  }
  render (){
    const {userLocation, zoom, haveUserLocation, vehicle:{data}} = this.props.state;
    
    console.log('checking if data 505 exists', this.props.state.vehicle.data)
    const userPosition = [userLocation.lat, userLocation.lng];
    return(
      <Map className="map" center={userPosition} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        {this.props.state.vehicle.data ? this.markerRender(data.v505) : null}
        {this.props.state.vehicle.data ? this.markerRender(data.v506) : null}
        {
          haveUserLocation ?
          <Marker 
          icon={userIcon}
          position={userPosition}
          >
            <Popup>
            <div>test</div>
            </Popup>
          </Marker>: ""
        }
        {/* https://react-leaflet.js.org/docs/en/components#marker */}
      </Map>
    )
  }
}
