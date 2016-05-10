var socket = io();
var name = prompt("Enter a nickname.");

$(canvas).mousedown(function(e){
    scale = 5/DIST(p[name].x, p[name].y, e.clientX, e.clientY);
    socket.emit('player-update', {name: name, x: p[name].x - scale * e.clientX, y: p[name].y - scale * e.clientY});
    console.log({name: name, x: p[name].x - scale * e.clientX, y: p[name].y - scale * e.clientY});
});

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




var p = {};
p[name] = {name: name,
            x: W/2,
            y: H/2,
            size: 1/20
          };
var ct = canvas.getContext("2d");
ct.drawCircle = function(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
};

function update() {
    //TODO: client-side predicting
}

function draw(players) {
    ct.beginPath();
    for (var p in players) {
	ct.drawCircle(players[p].x, players[p].y, W * players[p].size);
    }
    ct.stroke();
}

function main() {
    update();
    draw(p);
    requestAnimationFrame(main);
}

requestAnimationFrame(main);
