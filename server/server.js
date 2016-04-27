var express = require('express');
var app = express();
var https = require('https').Server(app);
var io = require('socket.io')(https);

var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var fs = require('fs');
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});
// app.use(express.static('client'));

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    var address = socket.handshake.address;
    console.log(adress.adress + ': ' + msg);
    io.emit('chat message', adress.adress + ': ' + msg);
  });
});

https.createServer(credentials, app).listen(process.env.PORT);
console.log('listening on port ' + process.env.PORT);
