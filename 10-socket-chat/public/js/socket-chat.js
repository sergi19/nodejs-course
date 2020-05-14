var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('The name and required are required');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

//socket.on -> listening events
socket.on('connect', function() {
    console.log('Connected to server');
    socket.emit('enterChat', user, function(resp) {
        console.log('Users online: ', resp);
    });
});

socket.on('disconnect', function() {
    console.log('We lost connection with the server');
});

socket.on('createMessage', function(message) {
    console.log(message);
});

socket.on('peopleList', function(people) {
    console.log(people);
});

//sokcet.emit -> send or emit information
/*socket.emit('createMessage', {
    message: 'Hi everyone'
}, function(resp){ 
    console.log(resp);
});*/

/*socket.emit('privateMessage', {
    message: 'Hi everyone'
}, function(resp){ 
    console.log(resp);
});*/

socket.on('privateMessage', function(message) {
    console.log('private message: ', message);
});