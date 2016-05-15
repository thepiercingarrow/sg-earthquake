socket.on('players', function(p){
    players = p;
});

var players = {};
players[name] = {name: name,
            x: W/2,
            y: H/2,
            size: 1/20
          };

function update() {
    socket.emit('player-update', {name: name, x: mouseX, y: mouseY});
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

requestAnimationFrame(main);
