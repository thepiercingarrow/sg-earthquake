var KEY_GRAPPLE = 82;
var KEY_CHAT_FOCUS = 84;
var KEY_CHAT_FOCUS_2 = 116;
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

var socket = io();

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

socket.on('msg', function(m){
    appendmessage(m.msg, m.type, m.player);
});

canvas.addEventListener('mousemove', function(e){
    input.update.mouseX = e.clientX, input.update.mouseY = e.clientY;
});

canvas.addEventListener('mousedown', function(e){
    input.update.mouseDown = true;
});

canvas.addEventListener('mouseup', function(e){
    input.update.mouseDown = false;
});

canvas.addEventListener('keydown', function(e){
    canvas_input(e.keyCode, true);
});

canvas.addEventListener('keypress', function(e){
});

canvas.addEventListener('keyup', function(e){
    if (e.keyCode == KEY_CHAT_FOCUS)
	chatbar.focus();
    else if (e.keyCode == KEY_ESC) {
	menu.style.display = "initial";
	namebar.focus();
    }
    else
	canvas_input(e.keyCode, false);
});

chatbar.addEventListener('keydown', function(e){
    if (e.keyCode = KEY_ENTER)
	chatbar.focus();
});


chatbar.addEventListener('keyup', function(e){
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

 var arena = {};

var tick = 0;
var frame;

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

setInterval(function(){++tick}, 45);

function start(e) {
    socket.emit('spawn', name);
}

socket.on('spawned', function(a){
    arena = a;
    menu.style.display = 'none';
    canvas.focus();
    frame = requestAnimationFrame(main);
});

function main() {
    update();
    draw();
    frame = requestAnimationFrame(main);
}

socket.on('arena-update', function(a){
    arena = a;
});

function update() {
    if (math.objcmp(input.old, input.update) == false || tick >= 45) {
        socket.emit('new-input', input.update);
	tick = 0;
    }
}

function draw() {
    g.clearRect(0, 0, W, H);
    console.log(arena.grapplers);
    for (var grappler in arena.grapplers) {
	draw.circle(g, grappler.x, grappler.y, 10);
	console.log('drew circle');
	draw.label(g, grappler.x, grappler.y, grappler.name);
    };
//     arena.a.bullets.forEach((bullet) => {
// 	    draw.bullet(g, bullet.X, bullet.Y, bullet.angle);
//    });
}
