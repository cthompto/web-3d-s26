// Basic Three.js Example
// Chelsea Thompto - Spring 2026

// Three.js uses an import map to add features.
// The "import * as THREE from 'three';" will be
// in all sketches. Add-ons will be added after.

// The main library script
import * as THREE from "three";

// The plug-in for orbit controls
import { OrbitControls } from "./src/OrbitControls.js";
import { FontLoader } from "./src/FontLoader.js";

// The plug-in for First Person Controls
import { PointerLockControls } from "./src/PointerLockControls.js";

// Declaring global variables.
let camera, canvas, controls, scene, renderer;

// Variables for First Person Controls
let raycaster;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = true;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// march 24 variables 
let torusLine;

// Run the "init" function which is like "setup" in p5.
init();

// Define initial scene
function init() {
    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfeff5);
    scene.fog = new THREE.FogExp2(0xbfeff5, 0.0015);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(innerWidth, innerHeight);
    renderer.setAnimationLoop(animate);
    canvas.appendChild(renderer.domElement);

    // Setup camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 10, 0);

    // Setup Orbit Controls
    //controls = new OrbitControls( camera, renderer.domElement );
    //controls.listenToKeyEvents( window );
    //controls.enableDamping = true;
    //controls.dampingFactor = 0.05;
    //controls.screenSpacePanning = false;
    //controls.minDistance = 100;
    //controls.maxDistance = 500;
    //controls.cursorStyle = 'grab';
    //controls.maxPolarAngle = Math.PI / 2;

    // Setup First Person Controls
    // DO NOT TOUCH

    controls = new PointerLockControls(camera, document.body);

    const blocker = document.getElementById("blocker");
    const instructions = document.getElementById("instructions");

    instructions.addEventListener("click", function () {
        controls.lock();
    });

    controls.addEventListener("lock", function () {
        instructions.style.display = "none";
        blocker.style.display = "none";
    });

    controls.addEventListener("unlock", function () {
        blocker.style.display = "block";
        instructions.style.display = "";
    });

    scene.add(controls.object);

    const onKeyDown = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = true;
                break;

            case "ArrowLeft":
            case "KeyA":
                moveLeft = true;
                break;

            case "ArrowDown":
            case "KeyS":
                moveBackward = true;
                break;

            case "ArrowRight":
            case "KeyD":
                moveRight = true;
                break;

            case "Space":
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;
        }
    };

    const onKeyUp = function (event) {
        switch (event.code) {
            case "ArrowUp":
            case "KeyW":
                moveForward = false;
                break;

            case "ArrowLeft":
            case "KeyA":
                moveLeft = false;
                break;

            case "ArrowDown":
            case "KeyS":
                moveBackward = false;
                break;

            case "ArrowRight":
            case "KeyD":
                moveRight = false;
                break;
        }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);

    // End First Person Controls

    // Add font and text
    const loader = new FontLoader();
    loader.load("./Public Sans_Bold.json", function (font) {
        // create color and material
        const color = 0x006699;
        const matDark = new THREE.LineBasicMaterial({
            color: color,
            side: THREE.DoubleSide
        });
        const matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.6,
            side: THREE.DoubleSide
        });

        // create message
        const message = "March 24th Demo";
        
        // generate text shapes
        const shapes = font.generateShapes(message, 30);
        const fontGeo = new THREE.ShapeGeometry(shapes);
        fontGeo.computeBoundingBox();
        
        // center alignment
        const xMid = -0.5 * (fontGeo.boundingBox.max.x - fontGeo.boundingBox.min.x);
        fontGeo.translate(xMid, 0, 0);

        // add to scene
        const text = new THREE.Mesh(fontGeo, matLite);
        text.position.z = -200;
        text.position.y = 50;
        scene.add(text);
    });

    // Add world geometry

    // March 24 example material and object
    
    // donut shape
    const donut = new THREE.TorusGeometry( 50, 20, 16, 100 );
    
    // donut solid color
    const donutMaterial = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    const torus = new THREE.Mesh( donut, donutMaterial );
    torus.position.z = -250;
    torus.position.y = 50;
    scene.add( torus );
    
    // donut line color 
    // this one looks a little different due to the animation
    // because i needed to call the variable in another function
    // i declared the variable at the top of the sketch
    const donutLine = new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true } );
    torusLine = new THREE.Mesh( donut, donutLine ); 
    torusLine.position.z = -250;
    torusLine.position.y = 50;
    scene.add( torusLine );
    
    // torus knot shape
    const coolShape = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
    
    // torus knot color
    const knotColor = new THREE.MeshPhongMaterial( {color: 0x7f01a2} );
    const knotShape = new THREE.Mesh( coolShape, knotColor );
    knotShape.position.z = -300;
    knotShape.position.y = 50;
    scene.add( knotShape );

    // Ground
    const earth = new THREE.PlaneGeometry(4000, 4000);
    const ground = new THREE.MeshPhongMaterial({ color: 0x402314, flatShading: true });
    const mesh2 = new THREE.InstancedMesh(earth, ground, 500);
    mesh2.translateY(-60);
    mesh2.rotateX(-1.5708);
    scene.add(mesh2);

    // lights
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    const ambientLight = new THREE.AmbientLight(0x555555);
    scene.add(ambientLight);
}

// Function to update moving objects, in this case the camera.
// The render function is trigger at the end to update the canvas.
function animate() {
    // Start First Person Control Animations
    const time = performance.now();
    if (controls.isLocked === true) {
        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        controls.moveRight(-velocity.x * delta);
        controls.moveForward(-velocity.z * delta);

        // jump fix
        controls.object.position.y += velocity.y * delta;
        if (controls.object.position.y < 10) {
            velocity.y = 0;
            controls.object.position.y = 10;

            canJump = true;
        }
    }

    prevTime = time;
    // End First Person Control Animations

    torusLine.rotation.z += 0.001;
    
    render();
}

// Function to render the scene using the camera.
function render() {
    renderer.render(scene, camera);
}
