class Surface {
  constructor(phi) {
    this.end = createVector(width * cos(phi), width * sin(phi));
    this.n = createVector(-tan(phi), 1);
    this.n.normalize();
  }
}

Surface.prototype.show = function() {
  push();
  stroke(255);
  noFill();
  line(0, 0, this.end.x, this.end.y);
  pop();
};