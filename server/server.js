var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = process.env.PORT || 8000;

http.listen(port);
console.log('listening on port %d', port);
app.use(express.static('client'));

var players = {};
var grapplers = {};
var arena = {
    grapplers: {}
};
var tick = 0;

io.on('connection', onconnect);

function onconnect(socket) {
    players[socket.id] = {};
    var player = players[socket.id];
    io.emit('msg', {type: 'sys', msg: 'An unnamed grappler has connected.'});
    player.name = 'Unnamed grappler';

    socket.on('spawn', () => {
	grapplers[socket.id] = {name: player.name, input: {}};
        arena.grapplers[socket.id] = {name: player.name, x: 50, y: 50};
	socket.join('arena');
	socket.emit('spawned', arena);
    });

    socket.on('new-input', input => {
    	if (grapplers[socket.id] != undefined)
	    grapplers[socket.id].input = input;
    });

    socket.on('name-change', name => {
	io.emit('msg', {type: 'sys', msg: '\'' + player.name + '\' has changed their name to \'' + name + '\'.'});
	player.name = name;
	if (grapplers[socket.id]) {
	    grapplers[socket.id].name = name;
	    arena.grapplers[socket.id].name = name;
	}
    });

    socket.on('chat', msg => {
	io.emit('msg', {msg: msg, type: 'p', player: player.name});
    });

    socket.on('disconnect', () => {
	io.emit('msg', {msg: '\'' + player.name + '\' has disconnected', type: "sys"});
	delete grapplers[socket.id];
	delete grapplers[socket.id];
    });
}

function physics() {
    for (var key in grapplers) {
	g = arena.grapplers[key];
	g.x = grapplers[key].input.mouseX;
	g.y = grapplers[key].input.mouseY;
    };

    ++tick;
}

function send_arena() {
    io.to('arena').emit('arena-update', arena);
}

setInterval(physics, 15);
setInterval(send_arena, 45);
