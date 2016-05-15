var socket = io();
var name = prompt("Enter a nickname.");

var messages = document.getElementById('messages');
var chatbar = document.getElementById('chatbar');

socket.on('p_message', function(m){
    appendmessage(m.msg, m.type, m.player);
});

function appendmessage(msg, type, player) {
    if (messages.childNodes.length > 10) {
        messages.removeChild(messages.childNodes[0]);
    }
    var newmsg = document.createElement('li');
    newmsg.className = type;
    if (type == "player")
        newmsg.innerHTML = "<b>" + player + ": </b>" + msg;
    else
        newmsg.innerHTML = msg;
    messages.appendChild(newmsg);
}
