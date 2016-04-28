var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

app.use(express.static('client'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var address = socket.handshake.address;
    console.log(adress.adress + ': ' + msg);
    io.emit('chat message', adress.adress + ': ' + msg);
  });
});

http.createServer(credentials, app).listen(process.env.PORT);
console.log('listening on port ' + process.env.PORT);
