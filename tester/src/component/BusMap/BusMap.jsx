import React from 'react';
// import Control from 'react-leaflet-control';
import {Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './busMap.scss';
const { BaseLayer, Overlay } = LayersControl;
// https://leafletjs.com/reference-1.5.0.html#featuregroup

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
  if (data){
    // console.log('before map', data.v505)
    return data.map(info=> {
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
      >
      </Marker>
      )
    })
  } 
}


export default class BusMap extends React.Component {
  // console.log(this.props.state.userLocation, this.props.state.zoom)

  render (){
    const {userLocation, zoom, haveUserLocation, vehicle:{v505, v506}} = this.props.state;
    
    console.log('checking if data 505 exists', this.props.state.vehicle)
    const userPosition = [userLocation.lat, userLocation.lng];
    return(
      <Map className="map" center={userPosition} zoom={zoom}>

        <LayersControl position="topright">
          <BaseLayer checked name="Open Street Map">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          <BaseLayer name="High Contrast Base Map">
            {/* https://wiki.openstreetmap.org/wiki/Disabilities#Different_accessibility_challenge_types */}
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>

          <Overlay  name="505">
            <FeatureGroup alt="check this box to turn on the layer for route 505">
              {this.props.state.vehicle ? markerRender(v505) : null}
            </FeatureGroup>
          </Overlay>
          <Overlay  name="506">
            <FeatureGroup alt="check this box to turn on the layer for route 506">
              {this.props.state.vehicle ? markerRender(v506) : null}
            </FeatureGroup>
          </Overlay>
          
          <Overlay checked name="Your Location">
            {
              haveUserLocation ?
              <Marker 
                icon={userIcon}
                position={userPosition}
              >
                <Popup>
            <div>Your location is {userPosition}</div>
                </Popup>
              </Marker>: ""
            }
          </Overlay>
          {/* https://react-leaflet.js.org/docs/en/components#marker */}
        </LayersControl>
      </Map>
    )
  }
}
