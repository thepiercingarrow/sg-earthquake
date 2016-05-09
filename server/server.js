var express = require('express'),
    app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

var players = {};

app.use(express.static('client'));

io.on('connection', function(socket){
    socket.on('message', function(text){
	io.emit('message', {color: "blue", text: text});
    });
    socket.on('player-update', function(p){
	players[p.name] = p;
	io.emit('players', players);
    });
});

http.listen(process.env.PORT || 8000);
console.log('listening on port ' + process.env.PORT);
