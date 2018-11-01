const socket = require('socket.io');
const express = require('express');
const app = express();

let server = app.listen(4000);

let io = socket(server);
io.on('connection', (socket) => {

  console.log('CONNECTION ON PORT 4000');

});


module.exports = io;