import  {io }  from './http.js'

io.on('connection', (socket) =>{
     console.log(socket.id);
});