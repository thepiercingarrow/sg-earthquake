var socket = io();
var name = prompt("Enter a nickname.");

var messages = document.getElementById('messages');

$('.chatbar').bind("enterKey",function(e){
    socket.emit('message', name + ": " + $('.chatbar').val());
    var msg = $('.chatbar').val();
    $('.chatbar').val('');
    return false;
});

$('.chatbar').keyup(function(e){
    if(e.keyCode == 13)
	$(this).trigger("enterKey");
});

socket.on('message', function(msg){
    appendmessage(msg.text, msg.color);
});

function appendmessage(msg, type, player) {
    if (messages.childNodes.length > 10) {
        messages.removeChild(chatList.childNodes[0]);
    }
    var newmsg = document.createElement('li');
    if (type == "player") {
        newmsg.innerHTML = "<i>" + player + "</i>" + msg;
    }
    newmsg.className = type;
    newmsg.innerHTML = msg;
    messages.appendChild(newmsg);
}
