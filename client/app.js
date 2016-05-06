var socket = io();
name = prompt("Enter a nickname.");
$('form').submit(function(){
  socket.emit('chat message', name + ": " + $('#m').val());
  var msg = $("#m").val();
  $('#m').val('');
  return false;
});
socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
