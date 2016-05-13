var W = window.innerWidth, H = window.innerHeight;

var c = document.getElementById("canvas");

c.width = W; c.height = H;

var ct = c.getContext("2d");

ct.font = "20px Monaco";

ct.drawCircle = function(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
};

window.addEventListener('resize', function(){
    W = window.innerWidth, c.width = W;
    H = window.innerHeight, c.height = H;
}
