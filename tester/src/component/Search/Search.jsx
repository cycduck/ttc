import React from "react";
import "./search.scss";

export default function Search(props) {
  const {
    routeSearch,
    searchPOST,
    busSuggestion,
    dirSuggestion,
    dirPOST,
    stopSuggestion,
    stopPOST,
    stopPredict
  } = props.searchProps;
  return (
    <section className="search">
      <div>
        <h2 className="search__title">🔮 Bus predictions & stop info</h2>
        <form className="search__form" onSubmit={searchPOST}>
          <label htmlFor="routeSearch">1. Enter route name or number: </label>
          <input
            className="search__input"
            name="routeSearch"
            list="routeChoices"
            onChange={routeSearch}
            onInput={searchPOST}
            placeholder="Enter bus code or intersection"
            required
          />
          <datalist id="routeChoices">
            {busSuggestion.length > 0
              ? busSuggestion.map(info => (
                  <option className="suggestion-bus">{info}</option>
                ))
              : null}
          </datalist>
        </form>
        <form className="search__form" onSubmit={dirPOST}>
          <label htmlFor="directionSearch">2. Select a direction: </label>
          <input
            className="search__input"
            name="directionSearch"
            list="dirChoices"
            onInput={dirPOST}
            placeholder="choose a direction"
          />
          <datalist id="dirChoices">
            {dirSuggestion.length > 0
              ? dirSuggestion.map(info => (
                  <option className="suggestion-dir">{info}</option>
                ))
              : null}
          </datalist>
        </form>
        <form className="search__form">
          <label htmlFor="stopSearch">3. Select a route: </label>
          <input
            className="search__input"
            name="stopSearch"
            list="stopChoices"
            onInput={stopPOST}
            placeholder="choose a stop"
          />
          <datalist id="stopChoices">
            {stopSuggestion.length > 0
              ? stopSuggestion.map(info => (
                  <option className="suggestion-stop">{Object.keys(info)}</option>
                ))
              : null}
          </datalist>
        </form>
      </div>
      <div className="search__result">
        {stopPredict.length > 0 ? (
          <>
            <p>Next {stopPredict.length} bus arrives in:</p>
            {stopPredict.map(info => (<p>{info} minutes</p>))}
          </>
        ) : null}
      </div>
    </section>
  );
}