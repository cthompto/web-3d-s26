// three.js website demo slightly modified

// import main library and loaders

import * as THREE from "three";

// be sure loaders are in your "src" or "addons" folder
import { MTLLoader } from "../src/MTLLoader.js";
import { OBJLoader } from "../src/OBJLoader.js";
import { OrbitControls } from "../src/OrbitControls.js";

let camera, scene, renderer, controls;

init();

// this uses an asynchronous function because of the file size
async function init() {
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 20);
    camera.position.z = 2.5;

    // scene

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 15);
    camera.add(pointLight);
    scene.add(camera);

    // wire material
    const wireMat = new THREE.MeshBasicMaterial({
        color: 0x7a02fd,
        wireframe: true
    });

    // model loading

    // loading texture

    // MTL file loading
    // this sets the path to where the file is
    const mtlLoader = new MTLLoader().setPath("../assets/obj_mtl_ex/");
    // this loads the model
    const materials = await mtlLoader.loadAsync("male02.mtl");
    materials.preload();

    // OBJ loading
    // this sets the path to where the file is
    const objLoader = new OBJLoader().setPath("../assets/obj_mtl_ex/");
    // this adds MTL file to the model if you have it
    objLoader.setMaterials(materials); // optional since OBJ assets can be loaded without an accompanying MTL file
    // this loads the model
    const object = await objLoader.loadAsync("male02.obj");

    // position scale and add model to scene
    object.position.y = -0.95;
    object.scale.setScalar(0.01);
    scene.add(object);

    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    //

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 2;
    controls.maxDistance = 5;

    //

    window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    controls.update();

    renderer.render(scene, camera);
}
