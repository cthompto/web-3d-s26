let canvas;
let rotNum = 0;
let gapNum = 50;
let movingCheck = false;
let wireCheck = false;
let freezeCheck = false;
let cameraSwitch = true;
let r = 0;
let g = 255;
let b = 255;
let rl = 255;
let gl = 0;
let bl = 255;

function setup() {
    canvas = createCanvas(600, 600, WEBGL);
    canvas.parent("p5-holder");
    
    let button = createButton("Save Canvas");
    button.parent("button-holder");
    button.mousePressed(saveScreen);
    
    angleMode(DEGREES);
}

function draw() {
    background(50);

    // toggle between camera modes 
    if(cameraSwitch) {
        perspective();
    } else if (!cameraSwitch) {
        ortho();
    }
    
    // toggle wireframe on and off
    if (wireCheck) {
        strokeWeight(1);
        stroke(0);
    } else {
        noStroke();
    }

    lights();
    
    // base color (can be randomized)
    fill(r, g, b);
    shininess(10);
    
    // light color (can re randomized)
    specularMaterial(rl, gl, bl);
    
    // rotation control (can be frozen)
    rotateX(rotNum);
    rotateY(rotNum * 0.75);
    if (!freezeCheck) {
        rotNum++;
    }
    
    // animating cube expanding and contracting
    if (movingCheck) {
        if (gapNum > 0) {
            gapNum--;
        }
    } else if (!movingCheck) {
        if (gapNum < 50) {
            gapNum++;
        }
    }
    
    // draw 3D array of cubes
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            for (let k = 0; k < 9; k++) {
                push();
                translate(i * gapNum - 200, j * gapNum - 200, k * gapNum - 200);
                box(20);
                pop();
            }
        }
    }
}

// controls for keyboard binds
function keyPressed() {
    if (key == "z") {
        if (gapNum >= 50) {
            movingCheck = true;
        } else if (gapNum <= 0) {
            movingCheck = false;
        }
    } else if (key == "w") {
        if (wireCheck) {
            wireCheck = false;
        } else if (!wireCheck) {
            wireCheck = true;
        }
    } else if (key == "c") {
        r = random(255);
        g = random(255);
        b = random(255);
    } else if (key == "l") {
        rl = random(255);
        gl = random(255);
        bl = random(255);
    } else if (key == "r") {
        gapNum = 50;
        r = 0;
        g = 255;
        b = 255;
        rl = 255;
        gl = 0;
        bl = 255;
        movingCheck = false;
        wireCheck = false;
        freezeCheck = false;
        cameraSwitch = true;
    } else if (key == "p") {
       if (cameraSwitch) {
            cameraSwitch = false;
        } else if (!cameraSwitch) {
            cameraSwitch = true;
        } 
    }
}

// controls for mouse click
function mousePressed() {
    if (freezeCheck) {
        freezeCheck = false;
    } else if (!freezeCheck) {
        freezeCheck = true;
    }
}

// function for saving screen
function saveScreen() {
    save(canvas, 'demo.png');
}
