let shape;
let shape2;
let obX= 400;
let obY = 0;

function setup() {
    let canvas = createCanvas(600, 600, WEBGL);
    canvas.id("myCanvas");
    canvas.parent("p5-holder"); document.getElementById("myCanvas").style.borderRadius = "50%";
    angleMode(DEGREES);
    createObject();
    createObject2();
}

function draw() {
    background(255,255,0);
    
    camera(0, 0, 800, 0,0,0);
    lights();

    specularMaterial(255);
    shininess(20);
    noStroke();
    
    push();
    rotateX(obX);
    rotateY(obY);
    model(shape);
    rotateX(obX*2);
    model(shape2);
    pop();
    obX += 0.25;
    obY += 0.25;
    
    filter(POSTERIZE, 3);
    
}

function createObject() {
    beginGeometry();
    fill(0, 255, 255);
    push();
    rotateY(0);
    cone(100,150,100);
    translate(0,50,0);
    rotateX(180);
    cone(100,150,100);
    rotateX(180);
    translate(0,100,0);
    cone(100,50,100);
    rotateX(180);
    translate(0,250,0);
    cone(100,50,100);
    pop();
    shape = endGeometry();
}

function createObject2() {
    beginGeometry();
    fill(255,0,255);
    push();
    rotateX(90);
    translate(0,0,-25);
    rotateZ(30);
    torus(250, 50, 100, 50);
    pop();
    shape2 = endGeometry();
}