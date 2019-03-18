// Based on video by ThreeBlueOneBrown
// https://www.youtube.com/watch?v=brU5yLm9DZM

let countDiv;
let slider;
let count;
let n;
let message;

let calcPerFrame = 10000;

function setup() {
  createCanvas(windowWidth * .97, windowHeight * .85);
  slider = createSlider(1, 5, 1);
  countDiv = createDiv(count);

  countDiv.style('font-size', '36');
  countDiv.style('color', 'white');
  countDiv.style('font-family', 'Roboto');

  resetSketch();

  slider.mouseReleased(resetSketch);
  slider.touchEnded(resetSketch);
}

function resetSketch() {
  background(0);
  n = slider.value();
  count = 0;
  let phi = pow(10, -slider.value());
  particle = new Particle(phi);
  surface1 = new Surface(phi);
  phi = 0;
  surface2 = new Surface(phi);
}

function draw() {
  background(0, 5);
  translate(0, height * .5);
  scale(1, -1);

  surface1.show();
  surface2.show();
  particle.show();

  for (var i = 0; i < calcPerFrame; i++) {
    if (particle.collide(surface1)) {
      count += 1;
    } else if (particle.collide(surface2)) {
      count += 1;
    }
    particle.update();
  }

  if (n > 1) {
    message = "decimal places";
  } else {
    message = "decimal place";
  }

  countDiv.html(`Approximation is ${count/pow(10, n)} to ${n} ${message}. Sometimes the last digit takes a while.`);
}