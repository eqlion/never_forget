var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

let i = 0;
let h = 0;

var path = [];
let particle;

let upper = 1.07;
let lower = 0.93;

function setup() {
  createCanvas(windowWidth * .97, windowHeight * .97);
  colorMode(HSB, 255);
  background(0);

}

function draw() {
  background(51, 1);
  translate(width / 2, height / 3);
  rotate(PI);


  let noiseMax = 3;
  let j = 0;
  for (let a = 0; a < TWO_PI; a += radians(1)) {

    let xoff = map(cos(a), -1, 1, 0, noiseMax);
    let yoff = map(sin(a), -1, 1, 0, noiseMax);
    let whatever = calcR(a);
    let r = map(noise(xoff, yoff, zoff), 0, 1, lower * whatever, upper * whatever);
    let x = r * cos(a);
    let y = r * sin(a);
    path[j] = createVector(x, y);
    j += 1;
  }


  h += 200 / 360;
  h %= 255;

  stroke(h, 255, 255);
  strokeWeight(5);
  point(path[i].x, path[i].y);

  if (i < path.length - 1) {
    i += 1;
  } else {
    i = 0;
  }

  // if (lower < 1) {
  //   lower += 0.001;
  // }
  //
  // if (upper > 1) {
  //   upper -= 0.001;

  zoff += 0.01;
}

// function draw() {
//   var yoff = 0;
//   for (var y = 0; y < rows; y++) {
//     var xoff = 0;
//     for (var x = 0; x < cols; x++) {
//       var index = x + y * cols;
//       var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
//       var v = p5.Vector.fromAngle(angle);
//       v.setMag(1);
//       flowfield[index] = v;
//       xoff += inc;
//       stroke(0, 50);
//       // push();
//       // translate(x * scl, y * scl);
//       // rotate(v.heading());
//       // strokeWeight(1);
//       // line(0, 0, scl, 0);
//       // pop();
//     }
//     yoff += inc;
//
//     zoff += 0.0003;
//   }
//
//   for (var i = 0; i < particles.length; i++) {
//     particles[i].follow(flowfield);
//     particles[i].update();
//     particles[i].edges();
//     particles[i].show();
//   }

// fr.html(floor(frameRate()));
// }

function calcR(theta) {
  let r = 2 - 2 * sin(theta) + sin(theta) * sqrt(abs(cos(theta))) / (sin(theta) + 1.4);
  r *= min(width, height) / 9;
  return r;
}