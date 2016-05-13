socket.on('players', function(p){
    players = p;
});

var players = {};
players[name] = {name: name,
            x: W/2,
            y: H/2,
            size: 1/20
          };

function update(e) {
    socket.emit('player-update', {name: name, x: e.clientX, y: e.clientY});
    appendmessage(name + " => x: " + e.clientX + ", y: " + e.clientY, "dbg");
}

function draw() {
    ct.clearRect(0, 0, W, H);
    ct.beginPath();
    for (var p in players) {
	ct.drawCircle(players[p].x, players[p].y, 20);
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
