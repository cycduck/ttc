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
https://leafletjs.com/examples/extending/extending-3-controls.html
https://stackoverflow.com/questions/31924890/leaflet-js-custom-control-button-add-text-hover
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
https://reactstrap.github.io/
https://sparkgeo.com/blog/the-accessibility-of-web-maps/

### Leaflet JS - May need to come back for styling
https://reactstrap.github.io/components/tabs/
https://www.youtube.com/watch?v=J7pFiXh-ydA
https://leaflet-extras.github.io/leaflet-providers/preview/
http://bl.ocks.org/andyreagan/c81461c8a8ce52d103fc92decf9650b6
Layer control
https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/layers-control.js
Group markers together
https://github.com/PaulLeCam/react-leaflet/blob/master/example/components/custom-component.js

### Intervals - DONE
https://stackoverflow.com/questions/55510809/axios-auto-refresh-every-60-seconds-with-reactjs
https://javascript.info/settimeout-setinterval
Do I need to set a stop or just let the server run???

### Hooks - Priority 1 
https://reactjs.org/docs/hooks-intro.html
https://medium.com/@rossbulat/react-hooks-managing-web-sockets-with-useeffect-and-usestate-2dfc30eeceec

### Sockets  - DONE +5 on performance audit
https://socket.io/blog/socket-io-1-4-0/ (compression)
https://socket.io/get-started/chat/
https://socket.io/docs/
https://medium.com/front-end-weekly/what-are-websockets-7bf0e2e1af2
https://www.youtube.com/watch?v=ggVsXljT0MI
.emit is send
.emit('custom named event' func)
.on is receive
.on('custom named event' func)
Server side: it sppears that it has to start with io.on('connection', function(socket){your func}
Client side: const socket = io.connect('link')
socket.on()// socket.emit() 

### More stuff about async and await
https://scotch.io/tutorials/asynchronous-javascript-using-async-await 
https://gist.github.com/wesbos/1866f918824936ffb73d8fd0b02879b4
https://www.valentinog.com/blog/socket-react/
Verdict: After an hour of trying I guess I don't need axios.all/spread if I am using this

### Optimization
https://eloquentjavascript.net/11_async.html
Load map and markers separately?