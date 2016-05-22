var W = window.innerWidth, H = window.innerHeight;

var canvasFocus = 0;

var canvas = document.getElementById("canvas");

canvas.width = W; canvas.height = H;

var g = canvas.getContext("2d");

g.font = "20px Monaco";

g.drawCircle = function(x,y,r){
    this.moveTo(x+r,y);
    this.arc(x,y,r,0,TAU);
};

window.addEventListener('resize', function(){
    W = window.innerWidth, canvas.width = W;
    H = window.innerHeight, canvas.height = H;
});

window.addEventListener('blur', function(){
    if (canvasFocus)
        canvas.focus();
});
