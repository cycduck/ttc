const express = require('express');
const app = express();
const restbus = require('restbus');
const cors = require('cors');
const axios = require('axios');
const fs = require('file-system');
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

// // Find out which routes to use first
// restbus.listen(PORT, (err) =>{
//   if(err) {
//     console.log(`Server Error: ${err}`)
//   }
//   console.log(`listening on PORT: ${PORT}`)
// })

app.use('/restbus', restbus.middleware()); 
app.use(cors());


busMapping = (axiosdata) => {
  let x = axiosdata.map(info => {
    console.log('info.directionId', info)
    // console.log('info.directionId', info.directionId)
    // console.log(info.directionId ? (info.directionId[4] == 0 ? "E" : "W") : "nada")
    return {
      busId: info.id,
      routeId: info.routeId,
      directionId: (info.directionId ? (info.directionId[4] == 0 ? "E" : "W") : null), // E/S: 0 W/N: 1
      kph: info.kph,
      lat: info.lat,
      lng: info.lon
    }
  })
  return x
}

const vehicleAll = {};
const test = () => {
  console.time('process time ');
  // axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/vehicles`) // all vehicles
  axios.all([
    axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/506/vehicles`), // vehicles for 506
    axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/505/vehicles`) // vehicles for 505
  ])
  .then(axios.spread((vehicle506, vehicle505) => {
    vehicleAll[`v${vehicle505.data[0].routeId}`] = busMapping(vehicle505.data)
    vehicleAll[`v${vehicle506.data[0].routeId}`] = busMapping(vehicle506.data) // Processing time is insignificant

    // fs.writeFile('./data/data.json', JSON.stringify(vehicleAll), function (err) {console.log(err)})
    res.json(vehicleAll);
    console.timeEnd('process time ');
  }))
  .catch(err => {
    console.log(err)
  })

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
}

setInterval(()=>test(), 10000)

io.on('connection', (socket)=>{
  console.log('You have been shocketed, id: ', socket.id)
  // the server emits it as a busUpdate event
  io.sockets.emit('busUpdate', vehicleAll)
});

// TODO: move the interval, because you can't use an app.get as a function
// may not need the app.get even just get it form the locl host 8080