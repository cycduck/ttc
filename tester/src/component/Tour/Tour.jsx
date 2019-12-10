import React from "react";
import Reactour from 'reactour';
import './tour.scss';

export default function Tour2(props) {
  console.log(props.tourSwitch)
  
  const tourConfig = [
    {
      selector: '.modal__open',
      content: ()=>(

        <div className="tour__background">
          <p>"Let's begin the tour! You can use the left and right keys to control this tour. Hover over this box to return to the tour!</p>
        </div>
      )
    },
    {
      selector: '.leaflet-control-zoom',
      content: 'Zoom in and out',
    },
    {
      selector: '.leaflet-control-layers',
      content: 'Choose contrast mode here or turn on/off buses here',
    },
    {
      selector: '.search',
      content: 'Get bus predictions and bus stop info here',
    }
  ]
  return(
    <div className="tour__div">
      <Reactour
        onRequestClose={props.tourHandle}
        steps={tourConfig}
        isOpen={props.tourSwitch}
        maskClassName="mask" // ???
        className="tour"
        rounded={5}
        accentColor="red"
        // onAfterOpen={this.disableBody}
        // onBeforeClose={this.enableBody}
      />
    </div>
  )
}