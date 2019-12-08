import React, {useState} from 'react';

export default function Search(props) {


const {routeSearch, searchPOST, busSuggestion, dirSuggestion, dirPOST} = props.searchProps

  return (
    <>
      <form onSubmit={searchPOST}>
        <label htmlFor="routeSearch">1. Enter route number or route name: </label>
        <input name="routeSearch" list="routeChoices" onChange={routeSearch} onInput={searchPOST} placeholder="Enter bus code or intersection" required/>
        <datalist id="routeChoices">
          {busSuggestion.length>0 ? busSuggestion.map(info => <option className="suggestion-bus" id={info} >{info}</option>) :null}
        </datalist>
      </form>
      <form onSubmit={dirPOST}>
        <label htmlFor="directionSearch">2. Select a direction: </label>
        <input name="directionSearch" list="dirChoices" onInput={dirPOST} placeholder="choose a direction" /> 
        <datalist id="dirChoices">
          {console.log(dirSuggestion)}
          {dirSuggestion.length>0 ? dirSuggestion.map(info => <option className="suggestion-dir" id={info}>{info}</option>) :null}
        </datalist>
      </form >
      <form>
        <label htmlFor="stopSearch">3. Select a route: </label>
        <input name="stopSearch" list="stopChoices"/>
        <datalist id="stopChoices">

        </datalist>
      </form>                          
    </>
  )
}