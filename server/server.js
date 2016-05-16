var express = require('express'), app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

var players = {};

app.use(express.static('client'));

io.on('connection', function(socket){
    var name;
    socket.on('p_message', function(msg){
	io.emit('p_message', {msg: msg, type: "player", player: name});
    });
    socket.on('player-update', function(p){
	name = p.name;
	players[p.name] = p;
	io.to('arena').emit('players', players);
    });
    socket.on('disconnect', function(p){
	delete players[name];
    })
});

http.listen(process.env.PORT || 8000);
console.log('listening on port ' + process.env.PORT);
