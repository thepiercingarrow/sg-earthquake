var DRAW = {};

DRAW.circle = function(g, x, y, r){
    g.beginPath();
    g.arc(x, y, r, 0, 2 * Math.PI);
    g.closePath();
    g.stroke();
    g.fill();
};

DRAW.label = function(g, x, y, l){
    g.font = "20px Monaco";
    g.textAlign = "center";
    g.fillText(l, x, y - 35);
}
