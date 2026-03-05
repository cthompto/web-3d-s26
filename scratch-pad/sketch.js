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
    
    // Angle down and to the right to get a better view
rotateX(PI * -0.2);
rotateY(PI * 0.2);

// Draw a strip of quads in a spiral formation
beginShape(QUAD_STRIP);
for (let z = -100; z < 100; z += 5) {
  fill((z + frameCount) % 360, 100, 100);
  
  // Rotate the end point based on how far back it is,
  // and additionally based on the time
  let endPoint = createVector(0, 20);
  endPoint.rotate((z + frameCount) * 0.1);
  
  // In a QUAD_STRIP, each pair of vertices forms a
  // quad with the next pair. By making each pair have
  // a small y offset between them, we make a vertical
  // ribbon.
  vertex(endPoint.x, endPoint.y - 5, z);
  vertex(endPoint.x, endPoint.y + 5, z);
}
endShape();
}