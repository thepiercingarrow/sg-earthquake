var KEY_GRAPPLE = 82,
    KEY_CHAT_FOCUS = 84,
    KEY_SHIELD = 32,
    KEY_ENTER = 13,
    KEY_ESC = 27;

var input = {
    mouseX: 0,
    mouseY: 0,
    mouseDown: false,
    grapple: false,
    shield: false
};

c.addEventListener('mousemove', function(e){
    input.mouseX = e.clientX, input.mouseY = e.clientY;
});

c.addEventListener('mousedown', function(e){
    input.mouseDown = true;
});

c.addEventListener('mouseup', function(e){
    input.mouseDown = false;
});

c.addEventListener('keydown', function(e){
    canvas_input(e.keyCode, true);
});

c.addEventListener('keyup', function(e){
    canvas_input(e.keyCode, false);
});

chatbar.addEventListener('keydown', function(e){
    chat_input(e.keyCode);
});

function canvas_input(key, state) {
    switch (key) {
        case KEY_CHAT_FOCUS:
	    chatbar.focus(); break;
        case KEY_GRAPPLE:
	    input.grapple = state; break;
        case KEY_SHIELD:
	    input.shield = state; break;
    }
}

function chat_input(key) {
    switch (key) {
        case KEY_ENTER:
	    socket.emit('p_message', chatbar.value);
            chatbar.value = "";
    	    c.focus();
            break;
        case KEY_ESC:
	    chatbar.value = "";
    	    c.focus();
            break;
    }
}
