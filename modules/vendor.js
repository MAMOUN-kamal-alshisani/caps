'use strict';

require('dotenv').config();

const faker = require('faker');

const io = require('socket.io-client');
const HOST=process.env.HOST || 'http://localhost:3000';
// const vendor=io.connect(`${process.env.Host}/caps`);
const socket=io.connect(`${HOST}/caps`);

setInterval(()=>{

let Order ={

    store: process.env.STORE,
    orderID:faker.datatype.uuid(),
    customer:faker.name.findName(),
    address:faker.address.streetAddress()

};

socket.emit('pickup',Order)

},2000)


socket.on('vendorDileverd', payload => {
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
    // events.emit('DelivereCaps', payload);
  });

//   module.exports=vendor



// require('dotenv').config();
// let faker =require('faker');
// const io=require('socket.io-client');
// const HOST=process.env.HOST || 'http://localhost:8000';
// const socket=io.connect(`${HOST}/caps`);

// setInterval(() => {
//         let customerOrder={
//             storeName:process.env.STORENAME || 'doon',
//             orderId:faker.datatype.uuid(),
//             customerName:faker.name.findName(),
//             address:faker.address.streetAddress()
//         };
    
//         socket.emit('pickup',customerOrder);
// }, 1500);



// socket.on('vendorDileverd',payload=>{
//     console.log(`thank you for delivering ${payload.orderId}`);
    // socket.emit('vendorDileverd', payload);
// })