'use strict';

const events = require('../event');

events.on('driverPickUp',(payload)=>{
    
    setTimeout(()=>{

console.log(`DRIVER: picked up ${payload.orderID}`);
events.emit('Driver-in-transit',payload);
  },2000)  
    
})


events.on('cap-in-transit',(payload)=>{
    
    setTimeout(()=>{
  
  console.log(`DRIVER: delivered up ${payload.orderID}`);
  events.emit('vendorsDeliver',payload);
    },3000)  
      
  })


  module.exports=events