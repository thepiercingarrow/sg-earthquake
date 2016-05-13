var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

var players = {};

app.use(express.static('client'));

io.on('connection', function(socket){
    var name;
    socket.on('p_message', function(m){
	io.emit('p_message', {msg: m.msg, type: "player", player: name});
    });
    socket.on('player-update', function(p){
	name = p.name;
	players[p.name] = p;
	io.emit('players', players);
    	console.log("player updated: " + players[name]);
    });
    socket.on('disconnect', function(p){
    	console.log("player disconnected: " + players[name].name);
	delete players[name];
    })
});

http.listen(process.env.PORT || 8000);
console.log('listening on port ' + process.env.PORT);
