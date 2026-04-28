// Basic Three.js Example
// Chelsea Thompto - Spring 2026

// Three.js uses an import map to add features.
// The "import * as THREE from 'three';" will be
// in all sketches. Add-ons will be added after.

import * as THREE from "three";

import Stats from "../src/stats.module.js";
import { GUI } from "../src/lil-gui.module.min.js";

import { EffectComposer } from "../src/EffectComposer.js";
import { RenderPass } from "../src/RenderPass.js";
import { HalftonePass } from "../src/HalftonePass.js";

let stats;
let camera, composer, scene, raycaster, renderer;

let INTERSECTED;
let theta = 0;

const pointer = new THREE.Vector2();
const radius = 5;

init();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1, 1, 1).normalize();
    scene.add(light);

    const geometry = new THREE.BoxGeometry();

    for (let i = 0; i < 2000; i++) {
        const object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

        object.position.x = Math.random() * 40 - 20;
        object.position.y = Math.random() * 40 - 20;
        object.position.z = Math.random() * 40 - 20;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        object.scale.x = Math.random() + 0.5;
        object.scale.y = Math.random() + 0.5;
        object.scale.z = Math.random() + 0.5;

        scene.add(object);
    }

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);

    stats = new Stats();
    document.body.appendChild(stats.dom);

    // post-processing

    composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const params = {
        shape: 1,
        radius: 4,
        rotateR: Math.PI / 12,
        rotateB: (Math.PI / 12) * 2,
        rotateG: (Math.PI / 12) * 3,
        scatter: 0,
        blending: 1,
        blendingMode: 1,
        greyscale: false,
        disable: false
    };
    const halftonePass = new HalftonePass(params);
    composer.addPass(renderPass);
    composer.addPass(halftonePass);

    window.onresize = function () {
        // resize composer
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    };

    // GUI

    const controller = {
        radius: halftonePass.uniforms["radius"].value,
        rotateR: halftonePass.uniforms["rotateR"].value / (Math.PI / 180),
        rotateG: halftonePass.uniforms["rotateG"].value / (Math.PI / 180),
        rotateB: halftonePass.uniforms["rotateB"].value / (Math.PI / 180),
        scatter: halftonePass.uniforms["scatter"].value,
        shape: halftonePass.uniforms["shape"].value,
        greyscale: halftonePass.uniforms["greyscale"].value,
        blending: halftonePass.uniforms["blending"].value,
        blendingMode: halftonePass.uniforms["blendingMode"].value,
        disable: halftonePass.uniforms["disable"].value
    };

    function onGUIChange() {
        // update uniforms
        halftonePass.uniforms["radius"].value = controller.radius;
        halftonePass.uniforms["rotateR"].value = controller.rotateR * (Math.PI / 180);
        halftonePass.uniforms["rotateG"].value = controller.rotateG * (Math.PI / 180);
        halftonePass.uniforms["rotateB"].value = controller.rotateB * (Math.PI / 180);
        halftonePass.uniforms["scatter"].value = controller.scatter;
        halftonePass.uniforms["shape"].value = controller.shape;
        halftonePass.uniforms["greyscale"].value = controller.greyscale;
        halftonePass.uniforms["blending"].value = controller.blending;
        halftonePass.uniforms["blendingMode"].value = controller.blendingMode;
        halftonePass.uniforms["disable"].value = controller.disable;
    }

    const gui = new GUI();
    gui.add(controller, "shape", { Dot: 1, Ellipse: 2, Line: 3, Square: 4, Diamond: 5 }).onChange(onGUIChange);
    gui.add(controller, "radius", 1, 25).onChange(onGUIChange);
    gui.add(controller, "rotateR", 0, 90).onChange(onGUIChange);
    gui.add(controller, "rotateG", 0, 90).onChange(onGUIChange);
    gui.add(controller, "rotateB", 0, 90).onChange(onGUIChange);
    gui.add(controller, "scatter", 0, 1, 0.01).onChange(onGUIChange);
    gui.add(controller, "greyscale").onChange(onGUIChange);
    gui.add(controller, "blending", 0, 1, 0.01).onChange(onGUIChange);
    gui.add(controller, "blendingMode", { Linear: 1, Multiply: 2, Add: 3, Lighter: 4, Darker: 5 }).onChange(
        onGUIChange
    );
    gui.add(controller, "disable").onChange(onGUIChange);

    document.addEventListener("mousemove", onPointerMove);

    //

    window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

//

function animate() {
    render();
    stats.update();
}

function render() {
    theta += 0.1;

    camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
    camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
    camera.lookAt(scene.position);

    camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

            INTERSECTED = intersects[0].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex(0xff0000);
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);

        INTERSECTED = null;
    }

    composer.render(scene, camera);
}
