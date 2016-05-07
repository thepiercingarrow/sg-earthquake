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

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.drawCircle = function(x, y, r) {
  this.beginPath();
  this.arc(95,50,40,0,2*Math.PI);
  this.stroke();
