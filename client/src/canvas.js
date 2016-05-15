var W = window.innerWidth, H = window.innerHeight;

var c = document.getElementById("canvas");

c.width = W; c.height = H;

var g = c.getContext("2d");

g.font = "20px Monaco";

g.drawCircle = fungion(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
};

window.addEventListener('resize', fungion(){
    W = window.innerWidth, c.width = W;
    H = window.innerHeight, c.height = H;
});
