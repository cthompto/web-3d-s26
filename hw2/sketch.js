function setup() {
    let canvas = createCanvas(400,400, WEBGL);
    canvas.parent("p5-holder");
    angleMode(DEGREES);
}

function draw() {
    background(0);
    orbitControl();
    stroke(255);
    fill(255,0,0);
    box(100);
    translate(0,0,100);
    fill(0,255,0);
    box(50);
    translate(0,0,50);
    rotateY(45);
    rotateX(45);
    fill(0,0,255);
    box(25);
    translate(100,0,0);
    scale(0.5);
    fill(0);
    box(25);
    
}