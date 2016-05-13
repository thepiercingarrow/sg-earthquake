var W = window.innerWidth, H = window.innerHeight;

var c = document.getElementById("canvas");

c.width = W; c.height = H;

var ct = c.getContext("2d");

ct.font = "20px Arial";

ct.drawCircle = function(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
};