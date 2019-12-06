const express = require('express');
const app = express();
const restbus = require('restbus');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');

const PORT = process.env.PORT || 8080;
// use the port from the environment variable, else use 8080 https://stackoverflow.com/questions/18864677/what-is-process-env-port-in-node-js

// Socket sertup
const server = app.listen(PORT, (err) =>{
  if(err) {
    console.log(`Server Error: ${err}`)
  }
  console.log(`listening on PORT: ${PORT}`)
});

const io = require('socket.io')(server); // https://www.youtube.com/watch?v=UwS3wJoi7fY 2:22


app.use('/restbus', restbus.middleware()); 
app.use(cors());


const routePath = async () => {
  try {
    let allRoute = await axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/`)
    let routeId = await allRoute.data.map(info=> info.id) // returns an array of all route id
    // for each of the url
    let url = routeId.map((info, index) => {
      // create a new promise (at state pending)
      return new Promise((res, rej) => {
        // for every 0.5 seconds 
        setTimeout(() => {
          // covert the result values 
          res(axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/${info}/`));
        }, 500 * index);
      });
    })
    
    console.log('# of the axios request for stops and paths',url.length)
    // .then will unwrap the info in the promise
    // arguments is a JS object that is dynamic, you have to spread the arguments in order to use in an arrow function
    axios.all(url).then(axios.spread((...arguments) => {
      const allStop={}
      const allPath= {}; // route dictionary
      // for each of the promises
      arguments.forEach(response => {
        let item = response.data;
        let pathGPS = item.paths.map(path => 
          path.points.map(
            points => [points.lat, points.lon]
          )
        )
        // make a key and pair it with the stop and path value
        allStop[`v${item.id}`] = {stops:item.stops}
        allPath[`v${item.id}`] = pathGPS;
      });
      fs.writeFile('./data/stop.json', JSON.stringify(allStop), function(err) {console.log(err)});
      fs.writeFile('./data/path.json', JSON.stringify(allPath), function(err) {console.log(err)} )
      console.log('stops and paths DONE');
    }))
    .catch(err => {
      console.log('fail at writing file ', err)
    })
  } catch (err) {
    console.log('axios all error test 2 ', err)
  }
}
const routePathTimed = () => {
  let date = new Date()
  if (date.getHours()=== 15 && date.getMinutes() > 56 && date.getMinutes() < 58 ) {
    console.log(`it's ${date.getHours()}:${date.getMinutes()}, wakey wakey. getting data`);
    routePath(); // calling the route path funtion 
  }
}

setInterval(routePathTimed, 100000);


const busMapping = (axiosdata) => {

  let conversion = axiosdata.map(info => {
    let i = info.directionId ? info.directionId.indexOf("_")+1 : -1
    return {
      busId: info.id,
      routeId: info.routeId,
      directionId: (i > 0 ? info.directionId[i] : null), // E/S: 0 W/N: 1
      kph: info.kph,
      lat: info.lat,
      lng: info.lon
    }
  })
  return conversion
}

io.on('connect', (socket) => {
  console.log('You have been shocketed, id: ', socket.id) 
  const vehicleAll = {};
  const x = async () => {
    console.time('process time ');
    try{
      let vehicle505 = await axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/505/vehicles`);
      let vehicle506 = await axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/506/vehicles`);
      let vehicle510 = await axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/510/vehicles`);

      vehicleAll[`v${vehicle505.data[0].routeId}`] = busMapping(vehicle505.data);
      vehicleAll[`v${vehicle506.data[0].routeId}`] = busMapping(vehicle506.data);
      vehicleAll[`v${vehicle510.data[0].routeId}`] = busMapping(vehicle510.data);

      // fs.writeFile('./data/data.json', JSON.stringify(vehicleAll), function (err) {console.log(err)})
      socket.binary(false).emit('busUpdate', vehicleAll);
      // JSON isn't binary
    } catch (err) {
        console.log('socket error: ', err)
    };
    console.timeEnd('process time ');
  };
  x(); // start it once then every 15s
  setInterval(x, 20000);
  // TODO
  // when it's connect the socket will run the first timer constantly check the time new Date
  // if time is between 5am to 3am then start x and set the flag 
  // if the time is not between the two times, will stop x and set to flag false 
  // will start x only flag is false 
  // flag T/F to keep track if x has been called
  // a second one is the x()
  let pathData;
  let stopData;
  try {
    pathData = JSON.parse(fs.readFileSync('./data/path.json'));
    stopData = JSON.parse(fs.readFileSync('./data/stop.json'));
    // https://flaviocopes.com/node-reading-files/
 
  } catch (err) {
    pathData = {};
    stopData = {};
  }

  socket.binary(false).emit('busStop', stopData);
  socket.binary(false).emit('busPath', pathData);
  socket.on('disconnect', ()=>{
    console.log('someone disconnected');
  })
}
  ////////
  // console.time('process time to filter through vehicle list for 506 ');
  // axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/vehicles`) // all vehicles
  // .then(response => {
    
  //   // test filter through the route in the vehicle, average 0.001s
  //   let vehicle506 = response.data.find(info => {
  //     return info.routeId === '506'
  //   })
  //   let vehicle505 = response.data.find(info => {
  //     return info.routeId === '505'
  //   })
  //   const vehicleAll = [vehicle505, vehicle506]
  //   res.json(vehicleAll)
  //   console.timeEnd('process time to filter through vehicle list for 506 ');
  // })
  // .catch(err => {
  //   console.log(err);
  // })
  ////////
)


