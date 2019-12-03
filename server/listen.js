const express = require('express');
const app = express();
const restbus = require('restbus');

restbus.listen(8081, (err) =>{
  if(err) {
    console.log(`Server Error: ${err}`)
  }
  console.log(`listening`)
})