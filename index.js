var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
	console.log(`Chat Server listening on port ${port}`);
});

const users = [];
const rooms = ['roomA', 'roomB', 'roomC'];

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    socket.on('login', user => {
	if(users[user]) {
		let err = `User '${user}' already login to the chat`;
		socket.emit('login', { err: err});
	} else {
		users[user] = true;
		let message = `User ${user} successful connect to the chat!`;
		console.log(message);
		socket.broadcast.emit('info', message);
		socket.emit('login', { user: user });
	}
    });

    socket.on('logout', user => {
	if(users[user]) {
		delete users[user];
		let message = `User ${user} successful disconnect from the chat!`;
		console.log(message);
		socket.broadcast.emit('info', message);
		socket.emit('logout', { user: user });
	} else {
		let err = `User '${user}' not connected to the chat`;
		socket.emit('logout', { err: err});
	}

    });

    socket.on('message', (data) => {
	io.sockets.emit('message', data);
    });

    // rooms
    socket.on('messageRoom', (data) => {
	io.to(data.room).emit('messageRoom', data);
    });

    socket.on('enterRoom', (data) => {
	socket.join(data.room);
    });

    socket.on('exitRoom', (data) => {
	socket.leave(data.room);
    });

});
