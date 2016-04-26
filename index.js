var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile('/index.html');
});

io.on('connection', function(socket){
  socket.on('new room message', function(msg){
    console.log(msg);
    io.emit('new room message', msg);
  });
  socket.on('new whisper', function(msg){
    io.emit('new whisper', msg);
  });
});

http.listen(process.env.PORT, function(){
  console.log('listening on port ' + process.env.PORT);
});
