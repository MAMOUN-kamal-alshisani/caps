'use strict';

require('dotenv').config();
const PORT=process.env.PORT || 4000

const io = require('socket.io')(PORT)


const caps =io.of('/caps')

const uuid=require(uuid).v4

const queue={
    messageID: {}
};

    caps.on('connection', socket => {
        socket.on("join",room=>{

            console.log("room name:", room);
            socket.join('room');
        })


        socket.on('pickup',(payload)=>{
             let id=uuid();
             queue.messageID[id]={
                event: 'pickup',payload
                
             };
            
            caps.emit('pickup', {id,payload: queue.messageID[id]})
            console.log(queue)
             });
            
        
            
             socket.on('in-transit',(payload)=>{
                let id=uuid();
                queue.messageID[id]={
                   event: 'in-transit',payload};
               
               caps.emit('in-transit', {id,payload: queue.messageID[id]})
               console.log(queue)
                });
               
           
            
        
        
         socket.on('delivered',(payload) =>{
        
            let id=uuid();
            queue.messageID[id]={
               event: 'delivered',payload};
           
           caps.emit('delivered', {id,payload: queue.messageID[id]})
           console.log(queue)
            });
           

            socket.on('received', id=>{

                delete queue.messageID[id];
                
                })

                socket.on('getAll',()=>{

                    Object.keys(queue.messageID).forEach(id=>{
                    
                        socket.emit('messages',{id, payload:queue.messageID[id]})
                    })
                    
                    })
                    
      });
      


















//       'use strict';

// require('dotenv').config();
// const PORT=process.env.PORT || 4000

// const io = require('socket.io')(PORT)


// const caps =io.of('/caps')

// const uuid=require(uuid).v4

// const queue={
//     messageID: {}
// };

    // caps.on('connection', socket => {
    //     socket.on("join",room=>{

    //         console.log("room name:", room);
    //         socket.join('some room');
    //     })


    //     socket.on('pickup',(payload)=>{
    //          let id=uuid();
    //          queue.messageID[id]={
    //             event: 'pickup',payload
                
    //          };
            
    //         caps.emit('pickup', {id,payload: queue.messageID[id]})
    //         console.log(queue)
    //          });
            
        
            
    //          socket.on('in-transit',(payload)=>{
    //             let id=uuid();
    //             queue.messageID[id]={
    //                event: 'in-transit',payload};
               
    //            caps.emit('pickup', {id,payload: queue.messageID[id]})
    //            console.log(queue)
    //             });
               
           
            
        
        
    //      socket.on('delivered',(payload) =>{
        
    //         console.log('Event:',{
            
    //         event: 'delivered',
    //         time: new Date(),
    //         payload: payload
    //         });
    //         caps.emit('delivered',payload);
    //         caps.emit('vendorDileverd',payload);
    //          });

    //   });
      








    'use strict';

require('dotenv').config();
const PORT = process.env.PORT_SERVER || 3005;
const io = require('socket.io')(PORT);
const uuid = require('uuid').v4;

const hub = io.of('/hub'); // namespace

const queue = {};

hub.on('connection', socket => {

  socket.on('join', room => {
    console.log('STORES:', room);
    if(!queue.hasOwnProperty(room)){
      queue[room] = {
        'newOrder': {},
        'received': {}
      };
    }
    socket.join(room);
  });

  socket.on('newOrder', payload => {
    let id = uuid();
    queue[payload.store]['newOrder'][id] = payload;
    console.log('current order queue', queue[payload.store]);
    hub.emit('order', {id, payload});
    // socket.emit('added');
  });

  socket.on('getAll', payload =>{
    console.log('++++++++++++++++++++',payload);
    Object.keys(queue[payload.store][payload.event]).forEach(id => {
      hub.emit('order', {id , payload: queue[payload.store][payload.event][id]} );
    });
  });

  socket.on('received', ({ id, payload }) =>{
    delete queue[payload.store]['newOrder'][id];
    queue[payload.store]['received'][id] = payload;
    console.log('updated queue:', queue[payload.store]);
  });

  socket.on('delivered', () =>{
    console.log('Your order has been delivered');
  });
});