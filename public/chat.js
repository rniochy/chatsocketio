const socket = io();

const urlSearch = new URLSearchParams(window.location.search);

const ursername = urlSearch.get("username");
const room = urlSearch.get("select_room");

document.getElementById("logout").addEventListener("click", (event)=> window.location.href="index.html");
const userAndRoom = document.getElementById("username");
userAndRoom.innerHTML = ` 
   <span> Olá  <strong>${ursername} - você na sala de ${room}</strong> </span> 
`;


socket.emit('select_room',{
     ursername,
     room,
}, messeges => {
     messeges.forEach(messege => {
           createdMessege(messege);
     });
})

document.getElementById('message_input')
.addEventListener('keypress', (event)=>{
    if(event.key == "Enter"){
         const messege = event.target.value;
         

         const data = {
             room,
            messege,
            ursername
         }

         socket.emit('messege', data);
         event.target.value = "";
    }

    socket.on("messege", data=>{
     createdMessege(data);
    })
})

 function createdMessege(data){
     const messegeDiv = document.getElementById("messages");
     messegeDiv.innerHTML += ` 
     <div class="new_message">
     <label class="form-label">
         <strong>${data.username}</strong>  <span> ${data.messege} - ${data.createdAt}</span>
     </label>
 </div>
     `;
 }