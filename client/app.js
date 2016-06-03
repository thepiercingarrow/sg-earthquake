var KEY_GRAPPLE = 82;
var KEY_CHAT_FOCUS = 84;
var KEY_SHIELD = 32;
var KEY_ENTER = 13;
var KEY_ESC = 27;

var canvas = document.getElementById("canvas");
var g = canvas.getContext("2d");
var menu = document.getElementById('menuwrapper');
var namebar = document.getElementById('name'), name;
var play = document.getElementById('play');
var messages = document.getElementById('messages');
var chatbar = document.getElementById('chatbar');

var TAU = 2 * Math.PI;

function dist(x1, y1, x2, y2) {
    var dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
}

g.drawCircle = function(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
};

function objcmp(o1, o2) {
    var eq = true;
    for (var p in o2) {
        if (o1[p] != o2[p]) {
            o1[p] = o2[p];
            eq = false;
        }
    }
    return eq;
}

var W = window.innerWidth, H = window.innerHeight;
canvas.width = W; canvas.height = H;

window.addEventListener('resize', function(){
    W = window.innerWidth, canvas.width = W;
    H = window.innerHeight, canvas.height = H;
});

namebar.addEventListener('change', function(e){
    name = namebar.value;
    input.name = name;
    socket.emit('name-change', input.name);
});

namebar.addEventListener('keypress', function(e){
    if (e.keyCode == KEY_ENTER)
	play.click();
});

play.addEventListener('click', start);

function appendmessage(msg, type, player) {
    if (messages.childNodes.length > 10) {
        messages.removeChild(messages.childNodes[0]);
    }
    var newmsg = document.createElement('li');
    newmsg.className = type;
    if (type == 'p')
        newmsg.innerHTML = "<b>" + player + ": </b>" + msg;
    else
        newmsg.innerHTML = msg;
    messages.appendChild(newmsg);
}

function dbg(msg) {
    appendmessage(msg, 'dbg');
}

var socket = io();

socket.on('players', function(p){
    players = p;
});

socket.on('msg', function(m){
    appendmessage(m.msg, m.type, m.player);
});

var players = {};

function start(e) {
    socket.emit('spawn', name);
    menu.style.display = 'none';
    canvas.focus();
    requestAnimationFrame(main);
}

var input = {
    old: {},
    update: {
        mouseX: 0,
        mouseY: 0,
        mouseDown: false,
        grapple: false,
        shield: false
    }
};

canvas.addEventListener('mousemove', function(e){
    input.update.mouseX = e.clientX, input.update.mouseY = e.clientY;
});

canvas.addEventListener('mousedown', function(e){
    input.update.mouseDown = true;
    input.update.mouseX = e.clientX, input.update.mouseY = e.clientY; //temp 4 mobile dbg
});

canvas.addEventListener('mouseup', function(e){
    input.update.mouseDown = false;
});

canvas.addEventListener('keydown', function(e){
    canvas_input(e.keyCode, true);
});

canvas.addEventListener('keypress', function(e){
    if (e.keyCode == KEY_CHAT_FOCUS)
	chatbar.focus();
});

canvas.addEventListener('keyup', function(e){
    canvas_input(e.keyCode, false);
});

chatbar.addEventListener('keydown', function(e){
    chat_input(e.keyCode);
});

function canvas_input(key, state) {
    switch (key) {
        case KEY_GRAPPLE:
	    input.update.grapple = state; break;
        case KEY_SHIELD:
	    input.update.shield = state; break;
    }
}

function chat_input(key) {
    switch (key) {
        case KEY_ENTER:
	    socket.emit('chat', chatbar.value);
            chatbar.value = "";
    	    canvas.focus();
            break;
        case KEY_ESC:
	    chatbar.value = "";
    	    canvas.focus();
            break;
    }
}

function main() {
    update();
    draw();
    requestAnimationFrame(main);
}

function update() {
    if (objcmp(input.old, input.update) == false || false) {
        socket.emit('player-update', {name: name, x: input.update.mouseX, y: input.update.mouseY});
    }
}

function draw() {
    g.clearRect(0, 0, W, H);
    g.beginPath();
    for (var p in players) {
        var x = players[p].x, y = players[p].y;
	g.font = "20px Monaco";
	g.textAlign = "center";
	g.fillText(players[p].name, x, y - 35);
	g.drawCircle(x, y, 20);
    }
    g.stroke();
    g.closePath();
}
