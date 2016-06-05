//process.env.DEBUG = "socket.io:socket*";

var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = process.env.PORT || 8000;

http.listen(port);
console.log('listening on port %d', port);
app.use(express.static('client'));

exports.players = {};
exports.grapplers = {};
exports.arena = {
    grapplers: {}
};
exports.tick = 0;

io.on('connection', onconnect);

function onconnect(socket) {
    exports.players[socket.id] = {};
    exports.player = exports.players[socket.id];
    io.emit('msg', {type: 'sys', msg: 'An unnamed grappler has connected.'});
    exports.player.name = 'Unnamed grappler';

    socket.on('spawn', () => {
	exports.grapplers[socket.id] = {name: exports.player.name, input: {}};
        exports.arena.grapplers[socket.id] = {name: exports.player.name, x: 50, y: 50};
	socket.join('arena');
	socket.emit('spawned', exports.arena);
    });

    socket.on('new-input', input => {
    	if (exports.grapplers[socket.id] != undefined)
	    exports.grapplers[socket.id].input = input;
    });

    socket.on('name-change', name => {
	io.emit('msg', {type: 'sys', msg: '\'' + exports.player.name + '\' has changed their name to \'' + name + '\'.'});
	exports.player.name = name;
	if (exports.grapplers[socket.id]) {
	    exports.grapplers[socket.id].name = name;
	    exports.arena.grapplers[socket.id].name = name;
	}
    });

    socket.on('chat', msg => {
	io.emit('msg', {msg: msg, type: 'p', player: player.name});
    });

    socket.on('disconnect', () => {
	io.emit('msg', {msg: '\'' + player.name + '\' has disconnected', type: "sys"});
	delete exports.grapplers[socket.id];
	delete exports.arena.grapplers[socket.id];
    });
}

function send_arena() {
    io.to('arena').emit('arena-update', exports.arena);
}

function START(physics){
    setInterval/*(function(){eval*/(physics/*)}*/, 15);
    setInterval(send_arena, 45);
};

exports.START = START;
