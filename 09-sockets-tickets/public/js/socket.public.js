var socket = io();

let ticketsLabels = [
    $('#lblTicket1'),
    $('#lblTicket2'),
    $('#lblTicket3'),
    $('#lblTicket4')
];

let desktopsLabels = [
    $('#lblEscritorio1'),
    $('#lblEscritorio2'),
    $('#lblEscritorio3'),
    $('#lblEscritorio4')
];

socket.on('actualTicket', function(resp) {
    updateHTML(resp.lastFourTickets);
});

socket.on('refreshPublic', function(resp) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    updateHTML(resp.lastFourTickets);
});

function updateHTML(lastFourTickets) {
    for (let i = 0; i < lastFourTickets.length; i++) {
        ticketsLabels[i].text('Ticket ' + lastFourTickets[i].number);
        desktopsLabels[i].text('Desktop ' + lastFourTickets[i].desktop);
    }
}