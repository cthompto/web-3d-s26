// Basic Three.js Example
// Chelsea Thompto - Spring 2026

// Three.js uses an import map to add features.
// The "import * as THREE from 'three';" will be
// in all sketches. Add-ons will be added after.

// The main library script
import * as THREE from "three";

// The plug-in for orbit controls
import { OrbitControls } from "../src/OrbitControls.js";
import { HDRLoader } from "../src/HDRLoader.js";
import { GUI } from "../src/lil-gui.module.min.js";

// Declaring global variables.
let camera, canvas, controls, scene, renderer;

// for exposure slider
const params = {
    exposure: 2.0
};

// Run the "init" function which is like "setup" in p5.
init();

// Define initial scene
function init() {
    // scene setup
    canvas = document.getElementById("3-holder");
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfeff5);
    //scene.fog = new THREE.FogExp2(0xbfeff5, 0.0015);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(innerWidth * 0.8, innerHeight * 0.8);
    renderer.setAnimationLoop(animate);
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = params.exposure;
    canvas.appendChild(renderer.domElement);

    // HDR Basic

    new HDRLoader().load("../assets/empty_warehouse_01_2k.hdr", function (texture, textureData) {
        //console.log( textureData );
        //console.log( texture );

        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

        const sphere = new THREE.SphereGeometry(800, 50, 50);

        const mesh = new THREE.Mesh(sphere, material);

        scene.add(mesh);

        render();
    });

    // Setup camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(400, 200, 0);

    // Setup controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 100;
    controls.maxDistance = 500;
    controls.cursorStyle = "grab";
    controls.maxPolarAngle = Math.PI / 2;

    const gui = new GUI();
    gui.add(params, "exposure", 0, 4, 0.01).onChange(render);
    gui.open();

    //// Add world geometry
    //
    //// Grouping of trees
    //const geometry = new THREE.ConeGeometry(10, 60, 8, 1);
    //const material = new THREE.MeshPhongMaterial({ color: 0x14401e, flatShading: true });
    //const mesh = new THREE.InstancedMesh(geometry, material, 500);
    //const tree = new THREE.Object3D();
    //for (let i = 0; i < 75; i++) {
    //    tree.position.x = Math.random() * 250 - 125;
    //    tree.position.y = 0;
    //    tree.position.z = Math.random() * 250 - 125;
    //    tree.updateMatrix();
    //    mesh.setMatrixAt(i, tree.matrix);
    //}
    //scene.add(mesh);
    //
    //// Ground
    //const earth = new THREE.PlaneGeometry(2000, 2000);
    //const ground = new THREE.MeshPhongMaterial({ color: 0x402314, flatShading: true });
    //const mesh2 = new THREE.InstancedMesh(earth, ground, 500);
    //mesh2.translateY(-60);
    //mesh2.rotateX(-1.5708);
    //scene.add(mesh2);

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
    controls.update();
    render();
}

// Function to render the scene using the camera.
function render() {
    renderer.toneMappingExposure = params.exposure;
    renderer.render(scene, camera);
}
