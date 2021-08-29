'use strict';

require('dotenv').config();

const faker = require('faker');

const events = require('../event');


setTimeout(()=>{

let Order ={

    store: process.env.STORE,
    orderID:faker.datatype.uuid(),
    customer:faker.name.findName(),
    address:faker.address.streetAddress()

};

events.emit('CapPickUp',Order)

},5000)


events.on('vendorsDeliver', payload => {
    console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
    events.emit('DelivereCaps', payload);
  });

  module.exports=events