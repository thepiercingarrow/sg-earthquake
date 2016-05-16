var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

var port = process.env.PORT;

var players = {};

app.use(express.static('client'));

io.on('connection', function(socket){
    socket.username = 'Unnamed grappler';
    socket.on('chat', function(msg){
	io.emit('message', {msg: msg, type: 'p', player: socket.name});
    });
    socket.on('player-update', function(p){
	name = p.name;
	players[p.name] = p;
	io.emit('players', players);
    });
    socket.on('disconnect', function(p){
	io.emit('message', {msg: socket.username + ' has disconnected', type: "sys"});
    })
});

if (!port) {
    console.log('Please specify a port.');
    process.exit(1);
}
http.listen(port);
console.log('listening on port %d', port);
