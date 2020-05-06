var socket = io();

//socket.on -> listening events
socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('We lost connection with the server');
});

socket.on('messageFromServer', function(message) {
    console.log(message);
})

//sokcet.emit -> send or emit information
socket.emit('messageFromClient', {
    user: 'Sergio',
    message: 'Hi everyone'
}, function(resp){ 
    console.log(resp);
});