const { io } = require('../server');
const { User } = require('../classes/user');
const { createMessage } = require('../utils/utils');

const user = new User();

io.on('connection', (client) => {
    client.on('disconnect', () => {
        let deletedUser = user.deletePerson(client.id);
        client.broadcast.to(deletedUser.room).emit('createMessage', createMessage('Administrator', `The user ${deletedUser.name} left the chat`));
        client.broadcast.to(deletedUser.room).emit('peopleList', user.getPeopleByRoom(deletedUser.room));
    });

    client.on('enterChat', (data, callback) => {
        console.log(data);
        if (!data.name || !data.room) {
            callback({
                err: true,
                message: 'The name and room are required'
            });
        }

        client.join(data.room);

        user.addPerson(client.id, data.name, data.room);
        let peoplebyRoom = user.getPeopleByRoom(data.room);
        client.broadcast.to(data.room).emit('peopleList', peoplebyRoom);
        callback(peoplebyRoom);
    });

    client.on('createMessage', (data) => {
        let person = user.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(person.room).emit('createMessage', message);
        client.broadcast.to(person.room).emit('createMessage', message);
    });


    client.on('privateMessage', data => {
        let person = user.getPerson(client.id);
        let message = createMessage(person.name, data.message);
        client.broadcast.to(data.to).emit('privateMessage', message);
    });
});