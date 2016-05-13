socket.on('players', function(p){
    players = p;
});

var W = window.innerWidth, H = window.innerHeight;

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
    appendmessage("drew circle | x: " + x + ", y: " + y + ", r: " + r, "dbg");
};

function update(e) {
    socket.emit('player-update', {name: name, x: e.clientX, y: e.clientY});
    appendmessage(name + " => x: " + e.clientX + ", y: " + e.clientY, "dbg");
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
