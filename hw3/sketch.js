let myShape;


function setup() {
    let canvas = createCanvas(400, 400, WEBGL);
    canvas.parent("p5-holder"); 
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
