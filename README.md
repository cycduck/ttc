# Todo list for TTC.get
### Keeping the game plan organized!!

* App detects users location (from broswer or IP)
* Add a pin to the map with the users location 

* [x] create-react-app
* [x] install react-leaflet
Have to install
* https://www.npmjs.com/package/leaflet, which has the css files from 
* https://leafletjs.com/
* https://leafletjs.com/examples/custom-icons/
Then install the JS files  19:59
https://react-leaflet.js.org/docs/en/installation 
* [x] get the map on the page
* [x] Icon... currently it has a margin
* https://www.geoapify.com/create-custom-map-marker-icon/
https://leafletjs.com/reference-1.6.0.html#divicon
* [x] get the users location
* [x] axios get on client app.js
* [ ] floating form??? 54:10 w/ react strap
* [x] modify axios on server side
* [x] retrieve data every 10s
  * [ ] PROBLEM: API sends new data every 30s
https://stackoverflow.com/questions/55510809/axios-auto-refresh-every-60-seconds-with-reactjs
* [ ] turn on/off routes
* [ ] animation transition css
* [ ] grey overlay on the map
* [ ] style the markers better (route on dot)
  * [x] text on dot, centered
  * [x] size of the dots
  * [ ] PROBLEM: some routes are null; SOLUTION: pass route # to the params, make a null specific style?
* [ ] END: MinJS your file!


## Important links
Read me formatting: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
Blog your process: https://medium.com/
The Proposal: https://docs.google.com/document/d/17fAyQCbwSMdWYp26JmlW-_FRY5YQ6AarVLegegtdxJc/edit#
Nano React App https://github.com/adrianmcli/nano-react-app

### Leaflet JS - May need to come back for styling
https://reactstrap.github.io/components/tabs/
https://www.youtube.com/watch?v=J7pFiXh-ydA

### Intervals - DONE
https://stackoverflow.com/questions/55510809/axios-auto-refresh-every-60-seconds-with-reactjs
https://javascript.info/settimeout-setinterval

### Hooks - Priority 1 
https://reactjs.org/docs/hooks-intro.html
https://medium.com/@rossbulat/react-hooks-managing-web-sockets-with-useeffect-and-usestate-2dfc30eeceec

### Sockets  - Priority 2
https://socket.io/get-started/chat/
https://medium.com/front-end-weekly/what-are-websockets-7bf0e2e1af2
https://www.youtube.com/watch?v=ggVsXljT0MI
.emit is send
.emit('custom named event' func)
.on is receive
.on('custom named event' func)

### Optimization
https://eloquentjavascript.net/11_async.html
Load map and markers separately?