import React from "react";
import {LayersControl, FeatureGroup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import './busMap.scss';
const { BaseLayer, Overlay } = LayersControl;


// https://stackoverflow.com/questions/48632123/what-do-the-angle-brackets-and-asterisk-mean-in-react



export default function MarkerGroup(props) {
  console.log(props.alt)
  console.log(props.name)
  console.log(props)

    return (
      <Overlay checked={props.check} name={props.name}>
        <FeatureGroup alt={props.alt}>
          
        </FeatureGroup>
      </Overlay>
    )

}