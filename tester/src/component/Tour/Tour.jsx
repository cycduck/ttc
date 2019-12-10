import React from "react";
import Reactour from 'reactour';

export default function Tour2(props) {
  console.log(props.tourSwitch)
  
  const tourConfig = [
    {
      selector: '.modal__open',
      content: "Let's begin the tour! You can use the left and right keys to control this tour. Hover over this box to return to the tour!"
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
    <div>
      {/* <Demo
        openTour={this.openTour}
        toggleShowMore={this.toggleShowMore}
        isShowingMore={isShowingMore}
      /> */}
      <Reactour
        onRequestClose={props.tourSwitch}
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