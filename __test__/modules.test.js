
"use strict";
const events = require("../event");
const supertest = require("supertest");

let payload=
{ store: '1-206-flowers',
  orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Jamal Braun',
  address: 'Schmittfort, LA' } 

jest.useFakeTimers();


describe("caps test", () => {
    it('pickup',()=>{
        const caps = require("../modules/caps");
        caps.emit('CapPickUp',payload);
        expect( caps.emit('CapPickUp',payload)).toEqual(true);
    });

    it('transit',()=>{
        const caps = require("../modules/caps");
        caps.emit('Driver-in-transit',payload);
        expect( caps.emit('Driver-in-transit',payload)).toEqual(true);
    });

    it('transit',()=>{
        const caps = require("../modules/caps");
        caps.emit('Driver-in-transit',payload);
        expect( caps.emit('Driver-in-transit',payload)).toEqual(true);
    });
});

describe("driver test", () => {
    it('transit',()=>{
        const driver = require("../modules/driver");
        driver.emit('Driver-in-transit',payload);
        expect( driver.emit('Driver-in-transit',payload)).toEqual(true);
    });

    it('transit',()=>{
        const driver = require("../modules/driver");
        driver.emit('driverTransit',payload);
        expect( driver.emit('driverTransit',payload)).toEqual(true);
    });

});


describe("driver test", () => {
    it('transit',()=>{
        const vendor = require("../modules/vendor");
        vendor.emit('vendorDileverd',payload);
        expect( vendor.emit('vendorDileverd',payload)).toEqual(true);
    });

});