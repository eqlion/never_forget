class Particle {
  constructor(phi) {
    this.pos = createVector(width, sin(phi) * (width / 3))
    this.speed = createVector(-4 / calcPerFrame, 0);
  }
}

Particle.prototype.show = function() {
  push();
  stroke(255, 0, 0);
  strokeWeight(4);
  point(this.pos.x, this.pos.y);
  pop();
};

Particle.prototype.update = function() {
  this.pos.add(this.speed);
};

Particle.prototype.collide = function(surface) {
  // Calculate new speed:
  // r = d - 2 (d • n)n
  // https://math.stackexchange.com/questions/13261/how-to-get-a-reflection-vector
  let pos = this.pos;
  let surfaceEnd = surface.end;
  let n = surface.n;
  let speed = this.speed;
  let a = p5.Vector.dot(speed, n);
  n = p5.Vector.mult(n, 2 * a);
  let r = p5.Vector.sub(speed, n);

  // Check if point is on the segment:
  // https://stackoverflow.com/questions/328107/how-can-you-determine-a-point-is-between-two-other-points-on-a-line-segment#
  let crossProduct = (surfaceEnd.y) * (pos.x) - (surfaceEnd.x) * (pos.y);
  let dotProduct = (surfaceEnd.x) * (pos.x) + (surfaceEnd.y) * (pos.y);
  let squaredLen = surfaceEnd.magSq();
  // Setting tolerance
  let eps = 1;
  if (abs(crossProduct) <= eps && dotProduct <= squaredLen) {
    this.speed = r;
    return true
  } else {
    return false
  }
};