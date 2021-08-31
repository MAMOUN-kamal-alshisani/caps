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


