import  {io }  from './http.js'

const users = [];

io.on('connection', (socket) =>{
     socket.on("select_room", data=>{
          
          socket.join(data.room);

          users.push({
                ursername: data.ursername,
                room: data.room,
                socket_id: socket.id
          })
     });
});