'use strict';

const events =require('../event');


const vendor=require('./vendor');
 const driver=require('./driver');



 events.on('CapPickUp',(payload) =>{

console.log('Event:',{

event: 'pickup',
time: new Date(),
payload: payload
});

events.emit('driverPickUp', payload)
 })




 events.on('Driver-in-transit',(payload)=>{

console.log('Event:',{

    event: 'in-transit',
    time: new Date(),
    payload: payload


});
events.emit('cap-in-transit', payload)
 })



 events.on('DelivereCaps',(payload) =>{

    console.log('Event:',{
    
    event: 'delivered',
    time: new Date(),
    payload: payload
    });
    
    // events.emit('driverDelivered', payload)
     })
    
     module.exports=events