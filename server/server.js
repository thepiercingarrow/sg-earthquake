// var physics = require('fs').readFile('./physics.js', "utf8");
var sg = require('./module.js');
sg.START(physics);

function physics(){
    for (var key in sg.grapplers) {
	sg.g = sg.arena.grapplers[key];
	sg.g.x = sg.grapplers[key].input.mouseX;
	sg.g.y = sg.grapplers[key].input.mouseY;
    };
    ++sg.tick;
}
