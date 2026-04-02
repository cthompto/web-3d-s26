let myShape;
function preload() {
  myShape = loadModel('../../assets/fog_block_1.obj', true);
}

function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    canvas.parent("p5-holder"); 
    angleMode(DEGREES);
}

function draw() {
    background(255);
    orbitControl();
    noStroke();
    lights();
    fill(0,255,255);
    shininess(10);
    specularMaterial(255,0,255);
    rotateX(180);  
    model(myShape);
}
