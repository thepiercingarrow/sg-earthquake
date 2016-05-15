var mouseX, mouseY, mouseDown;
var KEY_R = 82,
    KEY_T = 84,
    KEY_SPACE = 32,
    KEY_ENTER = 13;

c.addEventListener('mousemove', function(e){
    mouseX = e.clientX, mouseY = e.clientY;
});

c.addEventListener('mousedown', function(e){
    mouseDown = true;
});

c.addEventListener('mousedown', function(e){
    mouseDown = false;
});

function canvas_input(key, state) {
    switch (key) {
        case KEY_T:
	    chatbar.focus(); break;
        case KEY_R:
	    input.grapple = state; break;
        case KEY_SPACE:
	    input.shield = state; break;
    }
}

c.addEventListener('keydown', function(e){
    canvas_input(e.keyCode, true);
});

c.addEventListener('keyup', function(e){
    canvas_input(e.keyCode, false);
});

chatbar.addEventListener('keydown', function(e){
    if (e.keyCode == KEY_ENTER) {
        socket.emit('p_message', chatbar.value);
        chatbar.value = "";
	c.focus();
    }
});
