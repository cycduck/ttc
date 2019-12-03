import React from 'react';
// import Control from 'react-leaflet-control';
import {Map, TileLayer, Marker, Popup, LayersControl, FeatureGroup, Polyline} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './busMap.scss';
import BusMarker from '../BusMarker/BusMarker';
const { BaseLayer, Overlay } = LayersControl;
// https://leafletjs.com/reference-1.5.0.html#featuregroup



const userIcon = L.divIcon({
  className: 'map__user-icon',
  html: `<div class='map__user-icon-inner'></div>`,
  iconAnchor: [25,25]
});

const polyline = [
  [43.65194, -79.40236],
  [43.65202,-79.40225],
  [43.65278, -79.39834],
  [43.65294, -79.39804],
  [43.65307, -79.39742],
  [43.65325, -79.39625]
]



export default function BusMap(props) {
    console.log(props)
    const {userLocation: {lat, lng, zoom, haveUserLocation}, vehicle} = props;
    
    // console.log('checking if data 505 exists', vehicle.v505)
    const userPosition = [lat, lng];
    console.log(userPosition, haveUserLocation)
    return(
      <Map className="map" center={userPosition} zoom={zoom}>

        <LayersControl collapsed={false} position="topleft">
          <BaseLayer checked name="Regular">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Contrast">
            {/* https://wiki.openstreetmap.org/wiki/Disabilities#Different_accessibility_challenge_types */}
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
            />
          </BaseLayer>
          
          <Polyline color="lime" positions={polyline}/>

          <Overlay checked name="505">
            <FeatureGroup alt="check this box to turn on the layer for route 505">
              <BusMarker bus={vehicle.v505}/>
            </FeatureGroup>
          </Overlay>
          <Overlay checked name="506">
            <FeatureGroup alt="check this box to turn on the layer for route 506">
              <BusMarker bus={vehicle.v506}/>
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
                  <div>Your location is {userPosition[0]}, {userPosition[1]}</div>
                </Popup>
              </Marker>: ""
            }
          </Overlay>
          {/* https://react-leaflet.js.org/docs/en/components#marker */}
        </LayersControl>
      </Map>
    )

}
