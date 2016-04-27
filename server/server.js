var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '../client/index.html');
});
// app.use(express.static('client'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var address = socket.handshake.address;
    console.log(adress.adress + ': ' + msg);
    io.emit('chat message', adress.adress + ': ' + msg);
  });
});

http.listen(process.env.PORT, function(){
  console.log('listening on port ' + process.env.PORT);
});
