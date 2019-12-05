import React from 'react';
import {Polyline} from 'react-leaflet';

export default function RoutePath(props){
  console.log(props)
  return(
    <Polyline className="route" positions={props.position}/>
  )
}