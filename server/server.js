var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = process.env.PORT || 8000;

http.listen(port);
console.log('listening on port %d', port);
app.use(express.static('client'));

var players = new Map();
var grapplers = new Map();
var arena = {
    bullets: new Set(),
    blocks: new Set()
};

function Player(name) {
    this.name = name;
}

io.on('connection', onconnect);

function onconnect(socket) {
    players.set(socket.id, {});
    var p = players.get(socket.id);
    io.emit('msg', {type: 'sys', msg: 'An unnamed grappler has connected.'});
    p.name = 'Unnamed grappler';

    socket.on('spawn', function(){
	grapplers.set(socket.id, new Player(p.name));
	socket.join('arena');
    });

    socket.on('new-input', (input) => {
    	if (grapplers.has(socket.id))
	    grapplers.get(socket.id).input.update = input;
    });

    socket.on('name-change', (name) => {
	io.emit('msg', {type: 'sys', msg: '\'' + p.name + '\' has changed their name to \'' + name + '\'.'});
	p.name = name;
	if (grapplers.get(socket.id))
	    grapplers.get(socket.id).name = name;
    });

    socket.on('chat', (msg) => {
	io.emit('msg', {msg: msg, type: 'p', player: p.name});
    });

    socket.on('disconnect', () => {
	io.emit('msg', {msg: '\'' + p.name + '\' has disconnected', type: "sys"});
	grapplers.delete(socket.id);
	players.delete(socket.id);
    });
}

function physics() {
    grapplers.forEach((value, key) => {
	grapplers.get(value).X = key.input.update.mouseX;
	grapplers.get(value).Y = key.input.update.mouseY;
    });
}

function send_arena() {
    io.to('arena').emit('arena-update', {g: grapplers, a: arena});
}

setInterval(physics, 15);
setInterval(send_arena, 45);
