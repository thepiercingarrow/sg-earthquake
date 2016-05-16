var io = require('socket.io-client');
var socket = io();

socket.on('players', function(p){
    players = p;
});

socket.on('message', function(m){
    appendmessage(m.msg, m.type, m.player);
});
