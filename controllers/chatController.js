'use strict';

const Message = require('../models/message');

module.exports = io => {
    //listen for events on the server
    io.on('connection', client => {       
        client.on('disconnect', () => {
            client.broadcast.emit('user disconnected');
            console.log('user disconnected');
        });

        client.on('message', (data) =>     {
            let messageAttributes = {
                message:data.message,
                userName:data.userName,
                user:data.userId
            },
            m = new Message(messageAttributes);
            m.save()
                .then(() => {
                    io.emit('message', messageAttributes);
                })
                .catch(error => console.log(`error: ${error.message}`));
        });

       client.on('send username', data => {
            io.emit('user joined', {userName:data.userName})
        });

    });
};
