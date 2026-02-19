let myShape;
let myOthershape; 
let modelSwap = false;
let objectSwap = false;

function preload() {
  myShape = loadModel('./redCar.obj', true);
  myOthershape = loadModel('./LowPolyBunny.obj', true);
}

function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    canvas.parent("p5-holder"); 
    angleMode(DEGREES);
}

function draw() {
    background(255);
    lights();
    fill(0,255,255);
    shininess(10);
    specularMaterial(255,0,255);

    // code for left side
    push();
    rotateX(180);
    translate(-100,0,0);
    if(modelSwap) {
      rotateY(-90);
      model(myOthershape);
    } else if(!modelSwap) {
      model(myShape);
    }
    pop();

    // code for right side
    push();
    translate(100,0,0);
    if(objectSwap) {
      box();
    } else if(!objectSwap) {
      sphere();
    }
    pop();
}

function mousePressed() {
  if(modelSwap) {
    modelSwap = false;
  } else if(!modelSwap) {
    modelSwap = true;
  }
}

function keyPressed() {
  if (key=="s") {
  if(objectSwap) {
    objectSwap = false;
  } else if(!objectSwap) {
    objectSwap = true;
  }
  }

}