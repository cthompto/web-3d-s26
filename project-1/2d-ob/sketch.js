let myImage;
let myGraphic;
let modelSwap = false;
let objectSwap = false;
let imgW = 200;

function preload() {
  myImage = loadImage('./a-walk-thumb.png');
  myGraphic = loadImage('./obold.png');
}

function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    canvas.parent("p5-holder"); 
    angleMode(DEGREES);
}

function draw() {
    background(255,0,255);
    orbitControl();
    lights();
    fill(0,255,255);
    shininess(10);
    specularMaterial(255,0,255);

    // code for object
    push();
    if(objectSwap) {
      box();
    } else if(!objectSwap) {
      sphere();
    }
    pop();

    // regular raster image
    push();
    translate(0,0,-100);
    image(myImage,-imgW,-imgW,imgW*2);
    pop();

    // transparent image
    push();
    translate(0,0,100);
    image(myGraphic,-500,-500);
    pop();
}

// code for key press
function keyPressed() {
  if (key=="s") {
    if(objectSwap) {
      objectSwap = false;
    } else if(!objectSwap) {
      objectSwap = true;
    }
  }
}