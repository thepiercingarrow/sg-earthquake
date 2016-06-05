var DRAW = {};

DRAW.circle = function(g, x, y, r){
    g.beginPath();
    g.arc(x, y, r, 0, 2 * Math.PI);
    g.stroke();
    g.fill();
    g.closePath();
};

DRAW.label = function(g, x, y, l){
    g.font = "30px Monaco";
    g.textAlign = "center";
    g.fillText(l, x, y - 60);
};

var skin = document.getElementById('ice_god');

DRAW.grappler = function(g, x, y){
    g.drawImage(skin, x - 50, y - 50, 100, 100);
}
