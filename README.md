# Todo list for TTC.get
### Keeping the game plan organized!!

* App detects users location (from broswer or IP)
* Add a pin to the map with the users location 

* [x] create-react-app 11/27/2019
* [x] install react-leaflet 11/27/2019
Have to install
* https://www.npmjs.com/package/leaflet, which has the css files from 
* https://leafletjs.com/
* https://leafletjs.com/examples/custom-icons/
Then install the JS files  19:59
https://react-leaflet.js.org/docs/en/installation 
* [x] get the map on the page 11/27/2019
* [x] Icon... currently it has a margin 11/27/2019
* https://www.geoapify.com/create-custom-map-marker-icon/
https://leafletjs.com/reference-1.6.0.html#divicon
* [x] get the users location 11/28/2019
* [x] axios get on client app.js 11/28/2019
* [ ] floating for mini welcome info 54:10 w/ react strap
* [x] modify axios on server side 11/28/2019
* [x] Optimize with Sockets 11/30/2019
* [x] Optimize with Hooks 12/2/2019
* [x] Compontized markers 12/2/2019
* [x] retrieve data every 15s 11/28/2019
  * [ ] PROBLEM: API sends new data every 30s
https://stackoverflow.com/questions/55510809/axios-auto-refresh-every-60-seconds-with-reactjs
* [x] turn on/off routes 12/5/2019
https://leafletjs.com/examples/extending/extending-3-controls.html
https://stackoverflow.com/questions/31924890/leaflet-js-custom-control-button-add-text-hover
* [ ] auto suggest bar that suggests stops by code/title
* [ ] C: POST to server via socket
* [x] S: restructure search params (3 versions) 12/6/2019
* [ ] S: filter through the stop data return  coordinates, code, title (for making marker), id and route (key)for predictions
* [ ] animation transition css 11/29/2019
* [ ] style the markers better (route on dot)
  * [x] text on dot, centered 11/29/2019
  * [x] size of the dots 11/29/2019
  * [x] SOLVED: some routes are null; SOLUTION: pass route # to the params, make a null specific style? 12/5/2019
  * [ ] Can I make the checkboxes bigger?
    https://gis.stackexchange.com/questions/268651/change-the-default-checkbox-in-leaflet
* [ ] END: MinJS your file!


## Important links
Read me formatting: https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
Blog your process: https://medium.com/
The Proposal: https://docs.google.com/document/d/17fAyQCbwSMdWYp26JmlW-_FRY5YQ6AarVLegegtdxJc/edit#
Nano React App https://github.com/adrianmcli/nano-react-app
https://reactstrap.github.io/
https://sparkgeo.com/blog/the-accessibility-of-web-maps/
https://www.framer.com/api/motion/animation/#variants
https://greensock.com/
https://codepen.io/maheshambure21/pen/QwXaRw
https://graphql.org/
https://tarekraafat.github.io/autoComplete.js/demo/
https://tobiasahlin.com/moving-letters/
https://www.npmjs.com/package/intro.js-react
https://www.npmjs.com/package/reactour

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
https://alligator.io/js/settimeout-setinterval/
Do I need to set a stop or just let the server run???

### Hooks - Priority 1 - DONE +0 on performance audit (probably because I added new things :|)
https://reactjs.org/docs/hooks-intro.html
https://medium.com/@rossbulat/react-hooks-managing-web-sockets-with-useeffect-and-usestate-2dfc30eeceec
https://www.youtube.com/watch?v=sBws8MSXN7A
https://scotch.io/tutorials/build-a-react-to-do-app-with-react-hooks-no-class-components
useEffect https://www.youtube.com/watch?v=nAuWOnFMlOw
https://enmascript.com/articles/2018/10/26/react-conf-2018-understanding-react-hooks-proposal-with-simple-examples
Updating a state variable with useState always replaces the previous state, this is a key difference when compared to setState that merges states.

### Sockets  - DONE +5 on performance audit
https://socket.io/blog/socket-io-1-4-0/ (compression)
https://socket.io/get-started/chat/
https://socket.io/docs/
https://socket.io/docs/#Using-with-Node-http-server (sending data from client to server)
https://medium.com/front-end-weekly/what-are-websockets-7bf0e2e1af2
https://www.youtube.com/watch?v=ggVsXljT0MI
Games build with slither.io, https://agar.io/
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

### Bus Route generator, thought process -DONE
clickMe on marker sends routeID, for each of the vROUTEID, generate a polyline, but if I generate them how do I turn them off? OVERLOAD

Instead get the data from the Map.js (DONE) pass the coordinates to the path.
When marker is clicked send ID (retrived from the vehicledata), but where to store the ID?
to event listener?
runs a function that grabs the path array
But how to turn it off? 	
make a switch with state 

to state?
When a marker is clicked, send ID to state which stores ID and use an event listen to swtich on
if pathSwitch is T, generate Polyline by grabbing the ID from the state
Q: do I need to set state for ID?

### Bus Stop generator
* Proposal 1: -FAIL
Save a flat array of of codes and stops, server returns suggestion, client POST selection, server finds a match of code/stop, return ID (key) and stop id (key:stop:id), apply to dynamic axios get route, send predictions 
However, some stops have the same title and codes are also not unique

*Proposal 2: 
client POST bus number/name, server search through all routes find title key, returns 

### Datalist
onClick/onSelect do not work on option, put onInput to trigger event!
https://stackoverflow.com/questions/30022728/perform-action-when-clicking-html5-datalist-option

### Optimization
https://eloquentjavascript.net/11_async.html
Load map and markers separately?

https://www.tutorialspoint.com/leafletjs/leafletjs_controls.htm
https://gis.stackexchange.com/questions/60576/custom-leaflet-controls
https://codepen.io/adammertel/pen/MYVRZE
http://bl.ocks.org/andyreagan/c81461c8a8ce52d103fc92decf9650b6
https://github.com/bozdoz/wp-plugin-leaflet-map#leaflet-map-options
https://www.youtube.com/watch?v=NA5xcQSM5GA
https://venngage.com/blog/color-blind-friendly-palette/ ARIA



// TODO
  // when it's connect the socket will run the first timer constantly check the time new Date
  // if time is between 5am to 3am then start x and set the flag 
  // if the time is not between the two times, will stop x and set to flag false 
  // will start x only flag is false 
  // flag T/F to keep track if x has been called
  // a second one is the x()
