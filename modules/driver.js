'use strict';

// const driver=io.connect(`${process.env.Host}/caps`);
// const socket=io.connect(`http://localhost:3000/caps`);
// const events = require('../event');
require('dotenv').config();
const io = require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
const socket=io.connect(`${HOST}/caps`);




socket.on('DriverPickUp',(payload)=>{
    
    setTimeout(()=>{

console.log(`DRIVER: picked up ${payload.orderID}`);
socket.emit('in-transit',payload);
  },4000)  
    
})


socket.on('cap-in-transit',(payload)=>{
    
    setTimeout(()=>{
  
  console.log(`DRIVER: delivered up ${payload.orderID}`);
  socket.emit('delivered',payload);
    },3000)  
      
  });


  // module.exports=driver







// socket.on('transit',payload=>{
//   console.log('event:',{
//       event:'transit',
//       time:`${ye}-${mo}-${da} T ${time}`,
//       payload:payload
//   });
//   caps.emit('driverTransit',payload);
// });

// require('dotenv').config();
// const io=require('socket.io-client');
// const HOST=process.env.HOST || 'http://localhost:8000';
// const socket=io.connect(`${HOST}/caps`);



// socket.on('driverPickup', payload=>{
//     setTimeout(()=>{
//         console.log(`DRIVER: picked up ${payload.orderId}`);
//         socket.emit('transit',payload);
//     },5000);
// });


// socket.on('driverTransit',payload=>{
//     setTimeout(()=>{
//         console.log(`DRIVER: delivered  up ${payload.orderId}`);
//         socket.emit('deleverd',payload);
        
//     },3000)
// });
