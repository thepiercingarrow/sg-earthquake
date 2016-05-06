var socket = io();
name = prompt("Enter a nickname.");

$('.chatbar').bind("enterKey",function(e){
  socket.emit('chat message', name + ": " + $('#messages').val());
  var msg = $("#messages").val();
  $('#messages').val('');
  return false;
});

$('.chatbar').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

socket.on('chat message', function(msg){
  $('#messages').append($('<li>').text(msg));
});
