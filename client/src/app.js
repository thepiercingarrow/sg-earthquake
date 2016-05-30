var socket = io();

socket.on('players', function(p){
    players = p;
});

socket.on('message', function(m){
    appendmessage(m.msg, m.type, m.player);
});

var TAU = 2 * Math.PI;

function dist(x1, y1, x2, y2) {
    var dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
}

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

var canvas = document.getElementById("canvas");

canvas.width = W; canvas.height = H;

var g = canvas.getContext("2d");

g.font = "20px Monaco";

g.drawCircle = function(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
};

window.addEventListener('resize', function(){
    W = window.innerWidth, canvas.width = W;
    H = window.innerHeight, canvas.height = H;
});

var menu = document.getElementById('menuwrapper');
var namebar = document.getElementById('name'), name;
var play = document.getElementById('play');

namebar.addEventListener('change', function(e){
    name = namebar.value
});

play.addEventListener('click', start);

var messages = document.getElementById('messages');
var chatbar = document.getElementById('chatbar');

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

var players = {};
players[name] = {name: name,
            x: W/2,
            y: H/2,
            size: 1/20
          };

var start = function(e) {
    menu.style.display = 'none';
    requestAnimationFrame(main);
    socket.emit('spawn', name);
}

function update() {
    if (objcmp(input.old, input.new) == false) {
        socket.emit('player-update', {name: name, x: input.new.mouseX, y: input.new.mouseY});
    }
}

function draw() {
    g.clearRect(0, 0, W, H);
    g.beginPath();
    for (var p in players) {
        var x = players[p].x, y = players[p].y;
	g.fillText(players[p].name, x, y - 20);
	g.drawCircle(x, y, 20);
    }
    g.stroke();
    g.closePath();
}

function main() {
    update();
    draw();
    requestAnimationFrame(main);
}
