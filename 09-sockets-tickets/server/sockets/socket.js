const { io } = require('../server');
const { TicketControl } = require('../classes/ticketControl');

let ticketControl = new TicketControl();
io.on('connection', (client) => {

    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket();
        callback(nextTicket);
    });


    client.emit('actualTicket', {
        actual: ticketControl.getLastTicket(),
        lastFourTickets: ticketControl.getLastFourTickets()
    });


    client.on('attendTicket', (data, callback) => {
        if (!data.desktop) {
            return callback({
                err: true,
                message: 'The desktop is required'
            });
        }

        let ticket = ticketControl.attendTicket(data.desktop);
        callback(ticket);
        client.broadcast.emit('refreshPublic', {
            lastFourTickets: ticketControl.getLastFourTickets()
        });
    });
});