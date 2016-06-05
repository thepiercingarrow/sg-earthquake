for (var key in grapplers) {
    g = arena.grapplers[key];
    g.x = grapplers[key].input.mouseX;
    g.y = grapplers[key].input.mouseY;
};
++tick;
