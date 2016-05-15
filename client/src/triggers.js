var mouseX, mouseY, mouseDown;

c.addEventListener('mousemove', function(e){
    mouseX = e.clientX, mouseY = e.clientY;
});

c.addEventListener('mousedown', function(e){
    mouseDown = true;
});

c.addEventListener('mousedown', function(e){
    mouseDown = false;
});

c.addEventListener('keydown', function(e){
    //TODO
});

c.addEventListener('keyup', function(e){
    //TODO
});

$('.chatbar').keyup(function(e){
    if(e.keyCode == 13) {
	socket.emit('p_message', chatbar.value);
        chatbar.value = "";
        return false;
    }
});
