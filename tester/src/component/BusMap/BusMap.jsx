import React, {useState} from 'react';
// import Control from 'react-leaflet-control';
import {Map, TileLayer, Marker, Popup, LayersControl, Polyline, FeatureGroup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './busMap.scss';
import BusMarker from '../BusMarker/BusMarker';
const { BaseLayer, Overlay } = LayersControl;
const r505 = require('../../r505');
// https://leafletjs.com/reference-1.5.0.html#featuregroup

const {paths} = r505


const test = paths.map(path => 
  path.points.map(points =>  [points.lat, points.lon])
)
// const pathsArr = paths.map(lineVal => lineVal.points.map(pointVal => [pointVal.lat, pointVal.lon]));


console.log(test)

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



const routePaths = {
  v505: [
    [43.65194, -79.40236],
    [43.65202,-79.40225],
    [43.65278, -79.39834],
    [43.65294, -79.39804],
    [43.65307, -79.39742],
    [43.65325, -79.39625]
  ],
  // 506: [

  // ]
}



export default function BusMap(props) {
  console.log('what is here' , props.busPath)
  // console.log('what is here' , props.busStop)
    const [pathSwitch, setPathSwitch] = useState(false);
    const [currRouteId, setCurrRouteId] = useState(null);
    const {userLocation: {lat, lng, zoom, haveUserLocation}, vehicle} = props;
    
    const pathTrigger = (routeId) =>{
      // e.preventDefault();
      // console.log('being clicked;=', e.target)
      setCurrRouteId(routeId)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
      if (routeId ===  currRouteId ) {
        setPathSwitch(!pathSwitch)
      } else {
        setPathSwitch(true)
      }
      console.log(routeId)
    }
    
    
    // console.log('checking if data 505 exists', vehicle.v505)
    const userPosition = [lat, lng];
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
          
          {pathSwitch && currRouteId? <Polyline color="lime" positions={test}/> : null}
          {/* <Polyline positions={this takes the coordinates related to the route ID}/> */}
          
          <Overlay checked name="505">
            <FeatureGroup alt="check this box to turn on the layer for route 506">
            <BusMarker bus={vehicle.v505} clickMe={pathTrigger}/>
            </FeatureGroup>
          </Overlay>
          
          <Overlay checked name="506">
            <FeatureGroup alt="check this box to turn on the layer for route 506">
              <BusMarker bus={vehicle.v506} clickMe={pathTrigger}/>
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
