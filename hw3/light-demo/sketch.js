let myShape;
let lightZ = 100;
let lightDir = false;

function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
    //ballBlob();
}

function draw() {
    background(200);
    orbitControl();
    noStroke();
    lights();
    pointLight(15,0,0,0,0,lightZ);
    
    // handling the animation
    if(lightDir) {
        lightZ++;
        if(lightZ >= 100) {
            lightDir = false;
        }
    } else if(!lightDir) {
        lightZ--;
        if(lightZ <= -100) {
            lightDir = true;
        }
    }
    
    //ambientLight(255,255,0);
    fill(100);
    shininess(10);
    specularMaterial(255);
    //emissiveMaterial(255,0,255);
    ellipsoid(100,50,25);
    //filter(POSTERIZE, 1);
    //model(myShape);
    push();
    translate(0,100,0);
    noLights();
    box(50);
    pop();
}

// demo for proceedural shapes
function ballBlob() {
    beginGeometry();
    for (let i = 0; i < 200; i++) {
        let r = random(255);
        let g = random(255);
        let b = random(255);
        fill(r, g, b);
        let x = random(-100, 100);
        let y = random(-100, 100);
        let z = random(-100, 100);
        let size = random(5, 20);
        push();
        translate(x, y, z);
        sphere(size);
        translate(0,-size,0);
        sphere(size*0.75);
        translate(0,-size*0.75,0);
        sphere(size*0.5);
        pop();
    }
    myShape = endGeometry();
}
