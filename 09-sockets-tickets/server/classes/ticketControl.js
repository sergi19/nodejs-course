const fs = require('fs');

class Ticket {
    
    constructor(number, desktop) {
        this.number = number;
        this.desktop = desktop;
    }
}

class TicketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFourTickets = [];
        let data = require('../data/data.json');
        if (data.today === this.today) {
            this.last = data.last;
            this.tickets = data.tickets;
            this.lastFourTickets = data.lastFourTickets;
        } else {
            this.resetCount();
        }
    }

    getLastTicket() {
        return `Ticket ${this.last}`;
    }

    getLastFourTickets() {
        return this.lastFourTickets;
    }

    attendTicket(desktop) {
        if (this.tickets.length === 0) {
            return 'There are no tickets'
        }

        let ticketNumber = this.tickets[0].number;
        this.tickets.shift();
        let ticketToAttend = new Ticket(ticketNumber, desktop);
        this.lastFourTickets.unshift(ticketToAttend);

        if (this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice(-1, 1)
        }

        console.log('Last four');
        console.log(this.lastFourTickets);

        this.writeFile();
        return ticketToAttend;
    }

    nextTicket() {
        this.last += 1;
        let ticket = new Ticket(this.last, null);
        this.tickets.push(ticket);
        this.writeFile();

        return `Ticket ${this.last}`;
    }

    resetCount() {
        this.last = 0;
        this.tickets = [];
        this.lastFourTickets = [];
        this.writeFile();
    }

    writeFile() {
        let jsonString = JSON.stringify({
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFourTickets: this.lastFourTickets
        });

        fs.writeFileSync('./server/data/data.json', jsonString);
    }

}

module.exports = {
    TicketControl
}