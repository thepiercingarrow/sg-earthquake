var p;

var socket = io();
var name = prompt("Enter a nickname.");

$('.chatbar').bind("enterKey",function(e){
  socket.emit('message', name + ": " + $('.chatbar').val());
  var msg = $('.chatbar').val();
  $('.chatbar').val('');
  return false;
});

$('.chatbar').keyup(function(e){
  if(e.keyCode == 13)
    $(this).trigger("enterKey");
});

socket.on('message', function(msg){
  $('#messages').append($('<li style="color:' + msg.color + '">').text(msg.text));
});

socket.on('players', function(players){
  p = players;
}
//===================================================================================
var TAU = 2 * Math.PI;
var W = window.innerWidth;
var H = window.innerHeight;

var c = document.getElementById("canvas");
c.width = W; c.height = H;
var ct = canvas.getContext("2d");
ct.beginPath();
ct.drawCircle = function(x,y,r){
  this.moveTo(x+r,y);
  this.arc(x,y,r,0,TAU);
};

function update() {
    //TODO: client-side predicting
}

function draw(players) {
  for (var p in players) {
    ct.drawCircle(p.x, p.y, W * p.size);
  }
  ct.stroke();
}

function main() {
    update();
    draw(p);
    requestAnimationFrame(main);
}

requestAnimationFrame(main);
