var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var path = require('path');

app.use(express.static('client'));

io.on('connection', function(socket){
  socket.on('message', function(text){
    io.emit('message', {color: "blue", text: text});
  });
});

http.listen(process.env.PORT || 8000);
console.log('listening on port ' + process.env.PORT);
