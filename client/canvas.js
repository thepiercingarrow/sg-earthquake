var W = window.innerWidth, H = window.innerHeight;

var c = document.getElementById("canvas");

c.width = W; c.height = H;

var ct = c.getContext("2d");

ct.drawCircle = function(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
    appendmessage("drew circle | x: " + x + ", y: " + y + ", r: " + r, "dbg");
};
