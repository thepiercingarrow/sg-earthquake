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
var arena = new Map();

function Player(name) {
    this.name = name;
}

io.on('connection', onconnect);

function onconnect(socket) {
    players.set(socket.id, {});

    socket.on('spawn', function(){
	if (name == 'Unnamed grappler') {
            io.emit('message', {msg: socket.username + ' has changed their name to ' + name + '.', type: 'alert'});
        }
	grapplers.set(socket.id, new Player(players.get(socket.id).name));
        socket.join('arena');
    });

    socket.on('player-update', function(p){
	name = p.name;
	players[p.name] = p;
	io.to('arena').emit('players', players);
    });

    socket.on('chat', function(msg){
	io.emit('message', {msg: msg, type: 'p', player: players.get(socket.id).name});
    });

    socket.on('disconnect', function(p){
	grapplers.delete(socket.id);
	players.delete(socket.id);
	io.emit('message', {msg: player: players.get(socket.id).name} + ' has disconnected', type: "sys"});
    })
}
