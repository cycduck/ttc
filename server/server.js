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


app.use('/restbus', restbus.middleware()); 
app.use(cors());

app.get('/agencies/ttc/routes/505', (req, res) => {

  axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/505/`)
  .then(response=>{

    // console.log('test', response.data)
    res.json(response.data.stops)
    res.json(response.data.paths)
  }

  )
  // async function routePath() {
  //   try {

  //     let route505 = axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/505/`)
  //     console.log('test', route505)
  //     res.json(route505.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
})

const busMapping = (axiosdata) => {
  // console.log('info.directionId', axiosdata) // OK
  let conversion = axiosdata.map(info => {

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
  return conversion
}

io.on('connect', 
test = (socket) => {
  console.log('You have been shocketed, id: ', socket.id) // OK
  const vehicleAll = {};
  const x = async () => {
    console.time('process time ');
    try{
      let vehicle505 = await axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/505/vehicles`) // vehicles for 505
      let vehicle506 = await axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/routes/506/vehicles`) // vehicles for 506

      vehicleAll[`v${vehicle505.data[0].routeId}`] = busMapping(vehicle505.data)
      vehicleAll[`v${vehicle506.data[0].routeId}`] = busMapping(vehicle506.data) // Processing time is insignificant
  
      // fs.writeFile('./data/data.json', JSON.stringify(vehicleAll), function (err) {console.log(err)})
      socket.binary(false).emit('busUpdate', vehicleAll);
      // JSON isn't binary
    } catch (err) {
        console.log(err)
    };
    console.timeEnd('process time ');
  };
  x(); // start it once then every 15s
  setInterval(x, 15000);

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
