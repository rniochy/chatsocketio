const socket = io();

const urlSearch = new URLSearchParams(window.location.search);

const ursername = urlSearch.get("username");
const room = urlSearch.get("select_room");



socket.emit('select_room',{
     ursername,
     room,
})
console.log(ursername, room);