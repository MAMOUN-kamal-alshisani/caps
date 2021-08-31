// 'use strict';

// // const driver=io.connect(`${process.env.Host}/caps`);
// // const socket=io.connect(`http://localhost:3000/caps`);
// // const events = require('../event');
// require('dotenv').config();
// const io = require('socket.io-client');
// const HOST=process.env.HOST || 'http://localhost:3000';
// const socket=io.connect(`${HOST}/caps`);




// socket.on('DriverPickUp',(payload)=>{
    
//     setTimeout(()=>{

// console.log(`DRIVER: picked up ${payload.orderID}`);
// socket.emit('in-transit',payload);
//   },4000)  
    
// })


// socket.on('cap-in-transit',(payload)=>{
    
//     setTimeout(()=>{
  
//   console.log(`DRIVER: delivered up ${payload.orderID}`);
//   socket.emit('delivered',payload);
//     },3000)  
      
//   });



'use strict';

require('dotenv').config();
const io = require('socket.io-client');
const client = io.connect('http://localhost:3002/hub');

client.emit('getAll', {store:'acme-widgets', event:'newOrder'});
client.emit('getAll', {store:'1-206-flowers', event:'newOrder'});

client.on('order', ({id, payload}) => {
  client.emit('received', {id, payload});
  console.log(`DRIVER: Package #${payload.orderId} is ready for pickup`);

  setTimeout(()=> {
    client.emit('delivered', () => {
      console.log('Your order has been delivered');
    });
  }, 5000);

});
