let myShape;
let rotNum = 0;

function setup() {
    let canvas = createCanvas(600, 600, WEBGL);
    angleMode(DEGREES);
    //ballBlob();
    //ortho();
}

function draw() {
    background(0);
    orbitControl();
    noStroke();
    lights();
    fill(0,255,255);
    shininess(10);
    specularMaterial(255,0,255);
    //emissiveMaterial(255,0,255);
    rotateX(rotNum);
    rotateY(rotNum*0.75);
    rotNum++;
    for(let i = 0; i < 10; i++) {
        for(let j = 0; j < 10; j++) {
            push();
            translate((i*50)-200,(j*50)-200,0);
            box(20);
            pop();
        }
    }
    
    //filter(POSTERIZE, 1);
    //model(myShape);
    
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
