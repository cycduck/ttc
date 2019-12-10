import React, { useState } from "react";
import {Map, TileLayer, Marker, Popup, LayersControl, Polyline, FeatureGroup} from 'react-leaflet';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./busMap.scss";
import BusMarker from "../BusMarker/BusMarker";
import StopMarker from "../StopMarker/StopMarker";
const { BaseLayer, Overlay } = LayersControl;
// https://leafletjs.com/reference-1.5.0.html#featuregroup

const userIcon = L.divIcon({
  className: "map__user-icon",
  html: `<div class='map__user-icon-inner'></div>`,
  iconAnchor: [25, 25]
});

export default function BusMap(props) {
  console.log('busmap triggered');  
  const [pathSwitch, setPathSwitch] = useState(false);
  const [currRouteId, setCurrRouteId] = useState(null);
  const {
    mapCenter: { lat, lng, zoom },
    userLocation,
    bus,
    busPath,
    busStop
  } = props;
  const pathTrigger = routeId => {
    new Promise((res, rej) => {
      res(setCurrRouteId(routeId));
    }).then(response => {
      if (routeId === currRouteId || !currRouteId) {
        setPathSwitch(!pathSwitch);
      }
    });
  };

  // console.log('checking if data 505 exists', vehicle.v505)
  const mapCenter = [lat, lng];
  return (
    <Map className="map" center={mapCenter} zoom={zoom}>
      <LayersControl collapsed={true} position="topleft">
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

        {pathSwitch ? (
          <Polyline color="#601A4A" positions={busPath[currRouteId]} />
        ) : null}
        {/* <Polyline positions={this takes the coordinates related to the route ID}/> */}

        {/* <Overlay checked name="505">
          <FeatureGroup>
            <BusMarker bus={bus.v505} clickMe={pathTrigger} />
          </FeatureGroup>
        </Overlay>

        <Overlay checked name="506">
          <FeatureGroup>
            <BusMarker bus={bus.v506} clickMe={pathTrigger} />
          </FeatureGroup>
        </Overlay>

        <Overlay checked name="510">
          <FeatureGroup>
            <BusMarker bus={bus.v510} clickMe={pathTrigger} />
          </FeatureGroup>
        </Overlay> */}

        <FeatureGroup>
          {Object.keys(busStop).length>0 ? <StopMarker busStop={busStop} /> : null}
        </FeatureGroup>

        <Overlay checked name="Your Location">
          {userLocation.haveUserLocation ? (
            <Marker icon={userIcon} position={[userLocation.lat, userLocation.lng]}>
              <Popup>
                <div>
                  Your location is {userLocation.lat}, {userLocation.lng}
                </div>
              </Popup>
            </Marker>
          ) : (
            ""
          )}
        </Overlay>
        {/* https://react-leaflet.js.org/docs/en/components#marker */}
      </LayersControl>
    </Map>
  );
}
