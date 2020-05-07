var socket = io();
var searchParams = new URLSearchParams(window.location.search);
var label = $('small');

if (!searchParams.has('desktop')) {
    window.location = 'index.html';
    throw new Error('The desktop is required');
}

var desktop = searchParams.get('desktop');
$('h1').text('Desktop ' + desktop);
$('button').on('click', function() {
    socket.emit('attendTicket', {desktop: desktop}, function(resp) {
        if (resp === 'There are no tickets') {
            label.text(resp);
            setTimeout(() => {
                alert(resp);
            }, 500);
            return;
        }

        label.text('Attend ticket ' + resp.number);
    });
});

socket.on('connect', function() {
    console.log('Connected to the server');
});

socket.on('disconnect', function() {
    console.log('Disconnected to the server');
});