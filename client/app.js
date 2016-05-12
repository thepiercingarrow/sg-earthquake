var socket = io();
var name = prompt("Enter a nickname.");

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
    $('#messages').append($('<li style="color:' + msg.color + '">').text(msg.text));
});

socket.on('players', function(players){
    p = players;
});
//===================================================================================
var TAU = 2 * Math.PI,
    W = window.innerWidth,
    H = window.innerHeight;
function DIST(x1, y1, x2, y2){
    var dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
}

var c = document.getElementById("canvas");

c.width = W; c.height = H;

var players = {};
players[name] = {name: name,
            x: W/2,
            y: H/2,
            size: 1/20
          };
var ct = c.getContext("2d");
ct.drawCircle = function(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
};

function update(e) {
    socket.emit('player-update', {name: name, x: e.clientX, y: e.clientY});
    console.log({name: name, x: e.clientX, y: e.clientY});
}

function draw() {
    ct.clearRect(0, 0, W, H);
    ct.beginPath();
    for (var p in players) {
	ct.drawCircle(players[p].x, players[p].y, W * players[p].size);
    }
    ct.stroke();
    ct.closePath();
}

function main() {
   // update();
    draw();
    requestAnimationFrame(main);
}

requestAnimationFrame(main);
