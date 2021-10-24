import  {io }  from './http.js'

const users = [];
const messeges = [];

io.on('connection', (socket) =>{
     socket.on("select_room", data=>{
          
          socket.join(data.room);

          const userInroom = users.find(user=> user.username === data.username && user.username === data.username);

          if(userInroom){
               userInroom.socket_id = socket.id;
          } else {
               users.push({
                    ursername: data.ursername,
                    room: data.room,
                    socket_id: socket.id
              });

             
          }          
     }); 
     
     socket.on('messege', data => {

            const {username, room, messege} = data;
            const messege_ = {
                  username,
                  room,
                  messege,
                  createdAt: new Date(),
            }
             
            // SAVE THE MAESSEGE
            console.log(data)
            messeges.push(messege_); 

            // SEND TO USER IN THE SAME ROOM
            console.log(messege_)
            io.to(data.room).emit("messege", messege_);
            
     });
});