var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('../client'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(process.env.PORT, function(){
  console.log('listening on port ' + process.env.PORT);
});
