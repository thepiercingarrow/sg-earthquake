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
    blocks: new Set(),
    grapplers: new Map()
};
var tick = 0;

io.on('connection', onconnect);

function onconnect(socket) {
    players.set(socket.id, {});
    var player = players.get(socket.id);
    io.emit('msg', {type: 'sys', msg: 'An unnamed grappler has connected.'});
    player.name = 'Unnamed grappler';

    socket.on('spawn', () => {
	grapplers.set(socket.id, {name: player.name, input: {}});
        arena.grapplers.set(socket.id, {name: player.name, x: 50, y: 50});
	socket.join('arena');
	socket.emit('spawned');
    });

    socket.on('new-input', input => {
    	if (grapplers.has(socket.id))
	    grapplers.get(socket.id).input.update = input;
    });

    socket.on('name-change', name => {
	io.emit('msg', {type: 'sys', msg: '\'' + player.name + '\' has changed their name to \'' + name + '\'.'});
	player.name = name;
	if (grapplers.get(socket.id))
	    grapplers.get(socket.id).name = name;
    });

    socket.on('chat', msg => {
	io.emit('msg', {msg: msg, type: 'p', player: player.name});
    });

    socket.on('disconnect', () => {
	io.emit('msg', {msg: '\'' + player.name + '\' has disconnected', type: "sys"});
	grapplers.delete(socket.id);
	players.delete(socket.id);
    });
}

function physics() {
    grapplers.forEach((grappler, key) => {
	g = arena.grapplers.get(key);
	g.x = grappler.input.mouseX;
 	g.y = grappler.input.mouseY;
	console.log(g);
    });
//     var grappler = grapplers.get(value);
//     grappler.X += grappler.velX;
//     grappler.Y += grappler.velY;
    ++tick;
}

function send_arena() {
    io.to('arena').emit('arena-update', arena);
    //    console.log(arena);
}

setInterval(physics, 15);
setInterval(send_arena, 45);
