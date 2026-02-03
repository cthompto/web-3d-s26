let myShape;


function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    angleMode(DEGREES);
    ballBlob();
}

function draw() {
    background(0);
    orbitControl();
    noStroke();
    lights();

    model(myShape);
    
}

// demo for proceedural shapes
function ballBlob() {
    beginGeometry();
    for (let i = 0; i < 25; i++) {
        let r = random(255);
        let g = random(255);
        let b = random(255);
        fill(r, g, b);
        let x = random(-100, 100);
        let y = random(-100, 100);
        let z = random(-100, 100);
        let size = random(30, 70);
        push();
        translate(x, y, z);
        sphere(size);
        pop();
    }
    myShape = endGeometry();
}
