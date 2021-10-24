import  {io }  from './http.js'

const users = [];
const messeges = [];

io.on('connection', (socket) =>{
     socket.on("select_room", (data, callback)=>{
          
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
          // All messeges In the for everyUsers 
          const messegesRoom = getMessegeRoom(data.room);
          callback(messegesRoom);          
     }); 
     
     socket.on('messege', data => {
           const date = new Date();

            const {username, room, messege} = data;
            const messege_ = {
                  username,
                  room,
                  messege,
                  createdAt: `${date.getUTCDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${date.getHours()}
                  :${date.getMinutes()} ` ,
            }
             
            // SAVE THE MAESSEGE
            messege_.username = data.ursername;
            messeges.push(messege_); 

            // SEND TO USER IN THE SAME ROOM
            io.to(data.room).emit("messege", messege_);
            
     });
});

   function getMessegeRoom(room){
         const messegeRoom = messeges.filter(messege => messege.room === room);
         return messegeRoom;
   }