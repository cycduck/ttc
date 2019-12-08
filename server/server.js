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
    let queryStop = [];
    allRoute.data.forEach(info => queryStop.push(info.title))
    fs.writeFile('./data/queryStop.json', JSON.stringify(queryStop), function(err) {console.log(err)})
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
      const allStop ={};
      const allPath = {};
      // for each of the promises
      arguments.forEach(response => {
        let item = response.data;

        const stopMapping = (axiosdata) => {
          let conversion = axiosdata.map(info => {
            return {
              id: info.id,
              code: info.code,
              title: info.title,
              coordinate: [info.lat, info.lon]
            }
          })
          return conversion
        }
        // make a key and pair it with the stop and path value
        let pathGPS = item.paths.map(path =>  
          path.points.map(points => [points.lat, points.lon])
        )
        
        allStop[item.id] = stopMapping(item.stops)
        allPath[`v${item.id}`] = pathGPS;
      });
      fs.writeFile('./data/stop.json', JSON.stringify(allStop), function(err) {console.log(err)});
      fs.writeFile('./data/path.json', JSON.stringify(allPath), function(err) {console.log(err)} )
      console.log('stops and paths DONE');
    })).catch(err => {
      console.log('fail at writing file ', err)
    })
  } catch (err) {
    console.log('axios all error test 2 ', err)
  }
}
const routePathTimed = () => {
  let date = new Date()
  if (date.getHours()=== 14 && date.getMinutes() > 41 && date.getMinutes() < 43 ) {
    console.log(`it's ${date.getHours()}:${date.getMinutes()}, wakey wakey. getting data`);
    routePath(); // calling the route path funtion 
  }
}
// routePathTimed()
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
  const vehicleUpdate = async () => {
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
  vehicleUpdate(); // start it once then every 15s
  // setInterval(vehicleUpdate, 30000);
  
  let pathData;
  let stopData;
  // reading file to send data to client, if can't read send empty array
  try {
    pathData = JSON.parse(fs.readFileSync('./data/path.json'));
    stopData = JSON.parse(fs.readFileSync('./data/stop.json'));
    queryStop = JSON.parse(fs.readFileSync('./data/queryStop.json'));
    // https://flaviocopes.com/node-reading-files/
  } catch (err) {
    pathData = {};
    stopData = {};
  }
  socket.binary(false).emit('busPath', pathData);
  
  socket.on('search input', data => {
    let searchMatch = queryStop.filter(route => route.trim().includes(data.trim()));
    socket.emit('search suggestion', searchMatch.slice(0,5));
  })
// });
  // socket.on('search input', data => {
  //   data = data.trim();
  //   if (typeof data === "string") {
  //     data = data.toLowerCase()
  //   }
  //   console.log('search params', data);
  //   Object.values(queryStop).forEach(route => {
  //     let searchMatch = route.filter(word=> {
  //       word = word.trim();
  //       if(typeof word === "string") {
  //         word = word.toLowerCase()
  //       }
  //       return word.includes(data)
  //     })
  //     socket.emit('search suggestion', searchMatch)
  //   })
  // });
  socket.on('search submit', data => {
    console.log('search submission received', data);
    queryStop.forEach(info => {
      if(info.trim() === data.trim()) {
        const route = async () => {
          try {
            let routeAxios = await axios(`http://localhost:${PORT}/restbus/agencies/ttc/routes/`);
            let i = routeAxios.data.findIndex(info => info.title === data);
            let routeIdUrl = routeAxios.data[i]._links.self.href;
            let direction = await axios(routeIdUrl);
            let direcitonArr = [];
            let stopArr = {};
            direction.data.directions.forEach(dirTitle=> {
              direcitonArr.push(dirTitle.title);
              stopArr[dirTitle.title] = dirTitle.stops;
            });
            // socket.binary(false).emit('direction suggestion', [direcitonArr, stopArr]);
            console.log(stopArr)
            Object.values(stopArr).forEach(direction => {
              direction.findIndex(info => info === direction.data)
              // find all the indexes in direction.data.stops[i].code that matches with the array for stopArr
            })
          }catch (err){
            console.log('axios not found', err);
          }
        }
        route()
      }
    }) 
  })
  socket.on('direction input', data => {
    console.log('direction input', data)
  })
  // https://stackoverflow.com/questions/39296328/sending-mouse-click-events-using-socket-io

  socket.on('disconnect', ()=>{
    console.log('someone disconnected');
  })
}
//   ////////
//   // axios.get(`http://localhost:${PORT}/restbus/agencies/ttc/vehicles`) // all vehicles
//   ////////
)


