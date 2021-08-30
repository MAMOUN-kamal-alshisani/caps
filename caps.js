'use strict';
// const events =require('./event');
// const vendor=require('./modules/vendor');
//  const driver=require('./modules/driver');
require('dotenv').config()
const port=process.env.PORT ||4000

const io=require('socket.io')(port);

const caps=io.of('/caps');



io.on=('connection',(socket)=>{
console.log('connected to the sub successfuly',socket.id);

})


caps.on('connection',(socket) =>{
    console.log('connected to the sub successfuly');

socket.on('pickup',(payload)=>{

    console.log('Event:',{
    
        event: 'pickup',
        time: new Date(),
        payload: payload
    
        });
    caps.emit('DriverPickUp', payload)

     });
    

    
 socket.on('in-transit',(payload)=>{

console.log('Event:',{

    event: 'in-transit',
    time: new Date(),
    payload: payload


});
caps.emit('cap-in-transit', payload)
 });
    


 socket.on('delivered',(payload) =>{

    console.log('Event:',{
    
    event: 'delivered',
    time: new Date(),
    payload: payload
    });
    caps.emit('delivered',payload);
    caps.emit('vendorDileverd',payload);
     });
    
});


module.exports=caps
//  io.on('connection',(socket) =>{

// console.log('Event:',{

// event: 'pickup',
// time: new Date(),
// payload: payload
// });

// events.emit('driverPickUp', payload)
//  })




//  events.on('Driver-in-transit',(payload)=>{

// console.log('Event:',{

//     event: 'in-transit',
//     time: new Date(),
//     payload: payload


// });
// events.emit('cap-in-transit', payload)
//  })



//  events.on('DelivereCaps',(payload) =>{

//     console.log('Event:',{
    
//     event: 'delivered',
//     time: new Date(),
//     payload: payload
//     });
    
//     // events.emit('driverDelivered', payload)
//      })


// require('./models/driver');
// require('./models/vendor/vendor');

// require('dotenv').config();
// const port=process.env.PORT || 8000;
// const io=require('socket.io')(port);
// const caps=io.of('/caps')

// let d = new Date();
// let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
// let mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
// let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
// let time=d.toLocaleTimeString();


// io.on('connection',socket=>{
//     console.log('CONNECTED SUCCESSFULLY ',socket.id);
// });

// caps.on('connection',socket=>{
//     console.log('CONNECTED SUCCESSFULLY ',socket.id);

//     socket.on('pickup',payload=>{
//         console.log('event:',{
//             event:'pickup',
//             time:`${ye}-${mo}-${da} T ${time}`,
//             payload:payload
//         });
//         caps.emit('driverPickup',payload);
//     });

//     socket.on('transit',payload=>{
//         console.log('event:',{
//             event:'transit',
//             time:`${ye}-${mo}-${da} T ${time}`,
//             payload:payload
//         });
//         caps.emit('driverTransit',payload);
//     });

//     socket.on('deleverd',payload=>{
//         console.log('event:',{
//             event:'deleverd',
//             time:`${ye}-${mo}-${da} T ${time}`,
//             payload:payload
//         });
//         caps.emit('deleverd',payload);
//         caps.emit('vendorDileverd',payload);
//     });


// })




// module.exports=caps
