const { io } = require('../server');

io.on('connection', (client) => {
    console.log('User connected');

    client.emit('messageFromServer', {
        user: 'Administrator',
        message: 'Welcome to Socket Bases app'
    });

    client.on('disconnect', () => {
        console.log('User disconnected');
    });

    //Listening client
    client.on('messageFromClient', (data, callback) => {
        console.log(data);
        client.broadcast.emit('messageFromServer', data);
        /*if (message.user) {
            callback({
                resp: 'All worked well'
            });
        } else {
            callback({
                resp: 'All worked bad'
            });
        }*/
    });
});