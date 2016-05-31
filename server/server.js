var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var port = process.env.PORT || 8000;

http.listen(port);
console.log('listening on port %d', port);
app.use(express.static('client'));

var connections = new Map();
var grapplers = new Map();
var arena = new Map();

io.on('connection', onconnect);

function onconnect(socket) {
    
    socket.on('player-update', function(p){
	name = p.name;
	players[p.name] = p;
	io.to('arena').emit('players', players);
    });

    socket.on('spawn', function(name){
	if (name != socket.username) {
            io.emit('message', {msg: socket.username + ' has changed their name to ' + name + '.', type: 'alert'});
            socket.username = name;
        }
        socket.join('arena');
    });

    socket.on('chat', function(msg){
	io.emit('message', {msg: msg, type: 'p', player: socket.username});
    });

    socket.on('disconnect', function(p){
	io.emit('message', {msg: socket.username + ' has disconnected', type: "sys"});
    })
}
