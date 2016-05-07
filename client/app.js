var socket = io();
var name = prompt("Enter a nickname.");

$('.chatbar').bind("enterKey",function(e){
  socket.emit('chat message', name + ": " + $('.chatbar').val());
  var msg = $('.chatbar').val();
  $('.chatbar').val('');
  return false;
});

$('.chatbar').keyup(function(e){
  if(e.keyCode == 13)
    $(this).trigger("enterKey");
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});

var TAU = 2 * Math.PI;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.drawCircle = function(x, y, r) {
  this.beginPath();
  this.arc(x,y,r,0,TAU);
  this.stroke();
};

context.drawCircle(200, 200, 100);
