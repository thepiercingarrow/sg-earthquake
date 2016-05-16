var KEY_GRAPPLE = 82,
    KEY_CHAT_FOCUS = 84,
    KEY_SHIELD = 32,
    KEY_ENTER = 13,
    KEY_ESC = 27;

var input = {
    new: {
        mouseX: 0,
        mouseY: 0,
        mouseDown: false,
        grapple: false,
        shield: false
    }
};

c.addEventListener('mousemove', function(e){
    input.new.mouseX = e.clientX, input.new.mouseY = e.clientY;
});

c.addEventListener('mousedown', function(e){
    input.new.mouseDown = true;
    input.new.mouseX = e.clientX, input.new.mouseY = e.clientY; //temp 4 mobile dbg
});

c.addEventListener('mouseup', function(e){
    input.new.mouseDown = false;
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
	    input.new.grapple = state; break;
        case KEY_SHIELD:
	    input.new.shield = state; break;
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
