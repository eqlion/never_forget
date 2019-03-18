const n = 2;
let count, r;

let slider;

let font,
  fontsize = 64;

function preload() {
  font = loadFont('../resources/MajorMonoDisplay-Regular.ttf')
}

function setup() {
  c = createCanvas(windowWidth * .97, windowHeight * .97);
  r = min(width, height) / 2 * .7;

  textFont(font);
  textSize(fontsize);
  textAlign(CENTER, CENTER);

  slider = createSlider(1, 250, 1);
  slider.position(width * .05, height * .98);
  slider.size(width * .9);
}

function draw() {
  background(0);

  count = slider.value();

  push();
  translate(width / 2, height / 2);
  stroke(255, 255, 255, map(slider.value(), 10, 250, 255, 30));
  noFill();
  strokeWeight(1);

  circle(0, 0, r);

  for (i = 0; i < count; i++) {
    let phi = TWO_PI / count * i;
    let alpha = TWO_PI / count * (i * n % count);

    phi += HALF_PI;
    alpha += HALF_PI;

    let x = r * cos(phi);
    let y = r * sin(phi);

    let x_ = r * cos(alpha);
    let y_ = r * sin(alpha);

    line(x, y, x_, y_);
  }

  // Cardioid

  let a = r / 3;

  push();

  translate(0, -min(width, height) / 6 * .7)
  rotate(3 * HALF_PI);

  stroke(194, 24, 91, map(slider.value(), 10, 250, 0, 255));
  strokeWeight(3);
  noFill();

  beginShape();
  for (angle = 0; angle < TWO_PI; angle += TWO_PI / 360) {
    let x = 2 * a * (1 - cos(angle)) * cos(angle);
    let y = 2 * a * (1 - cos(angle)) * sin(angle);
    vertex(x, y);
  }
  endShape();

  pop();

  push();

  noStroke();
  fill(194, 24, 91, map(slider.value(), 10, 250, 0, 255));

  text('I', 0, -height * .4);
  text('You', 0, height * .4);

  pop();

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth * .97, windowHeight * .97);
  r = min(width, height) / 2 * .7;

  slider.position(width * .05, height * .98);
  slider.size(width * .9);
};