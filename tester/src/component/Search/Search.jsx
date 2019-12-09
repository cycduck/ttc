import React, {useState} from 'react';
import "./search.scss";

export default function Search(props) {


const {routeSearch, searchPOST, busSuggestion, dirSuggestion, dirPOST, stopSuggestion, stopPOST, stopPredict} = props.searchProps
  return (
    <section className="search">
      <form onSubmit={searchPOST}>
        <label htmlFor="routeSearch">1. Enter route name or number: </label>
        <input name="routeSearch" list="routeChoices" onChange={routeSearch} onInput={searchPOST} placeholder="Enter bus code or intersection" required/>
        <datalist id="routeChoices">
          {busSuggestion.length>0 ? busSuggestion.map(info => <option className="suggestion-bus">{info}</option>) :null}
        </datalist>
      </form>
      <form onSubmit={dirPOST}>
        <label htmlFor="directionSearch">2. Select a direction: </label>
        <input name="directionSearch" list="dirChoices" onInput={dirPOST} placeholder="choose a direction" /> 
        <datalist id="dirChoices">
          {dirSuggestion.length>0 ? dirSuggestion.map(info => <option className="suggestion-dir">{info}</option>) :null}
        </datalist>
      </form >
      <form>
        <label htmlFor="stopSearch">3. Select a route: </label>
        <input name="stopSearch" list="stopChoices" onInput={stopPOST}/>
        <datalist id="stopChoices">
          {stopSuggestion.length>0 ? stopSuggestion.map(info => <option className="suggestion-stop" >{Object.keys(info)}</option>) :null}
        </datalist>
      </form>   
        {stopPredict.length>0 ? 
          <div>
            <p>Next {stopPredict.length} bus arrives in:</p> 
            {stopPredict.map(info => <p>{info} minutes</p>)} 
          </div>: null
        }
    </section>
  )
}