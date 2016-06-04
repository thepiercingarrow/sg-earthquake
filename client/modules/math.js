var math = {};

math.TAU = 2 * Math.PI;

math.dist = function(x1, y1, x2, y2) {
    var dx = x1 - x2, dy = y1 - y2;
    return Math.sqrt(dx*dx + dy*dy);
}

math.objcmp = function(o1, o2) {
  var eq = true;
  for (var p in o2) {
  if (o1[p] != o2[p]) {
          o1[p] = o2[p];
          eq = false;
      }
  }
  return eq;
}

    require('socket.io-client');