import "./style.css";
import * as THREE from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

// Define constants/loaders
const loader = new GLTFLoader();
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
const image = document.getElementById("github-icon");

// Define variables
let mouseX = 0, mouseY = 0;
let globalTimeline;
let headTimeline;

// Define boolean variables
let isWireframeActive = true;
let hasModelLoaded = false;
let isAnimationComplete = false;
let isMouseOnScreen = true;

// Document event listener(s)
document.addEventListener("mousemove", onDocumentMouseMove);
document.addEventListener("mouseleave", onMouseLeave);
document.addEventListener("mouseenter", onMouseEnter);

// Window event listener(s)
window.addEventListener("resize", onWindowResize, false);

// Generate Three.js scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
  antialias: true,
})

// Set defualt renderer properties
renderer.setClearColor( 0x707070, 0);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
camera.rotation.y = 3.135;

// Get specific elements from HTML document
const element = document.getElementById("text");
const overlay = document.getElementById("overlay");
const canvas = document.getElementById("bg");
const footerMessage = document.getElementById("footer-message");

// Define lighting
const pointLightLeft = new THREE.PointLight(0xffffff, 0.5);
pointLightLeft.position.set(-4, 0, 7);

const pointLightRight = new THREE.PointLight(0xffffff, 0.5);
pointLightRight.position.set(4, -1, 6);

const ambientLight = new THREE.AmbientLight(0xffffff, 1.7)

// Create global variable for model and load
let faceModel;
loader.load("/models/akif.glb", (gltf) => {
  faceModel = gltf.scene;
  setWireframe(isWireframeActive);

  // const newMaterial = new THREE.MeshNormalMaterial();
  // akif.traverse((model) => {
  //   if (model.isMesh) model.material = newMaterial;
  // });

}, (xhr) => {
  // Output text loading progress
  const loaded = (xhr.loaded / xhr.total * 100).toFixed(2);
  element.innerHTML = `${loaded}`;

  if (loaded >= 100) {
    element.innerHTML = "muhl.is";
    footerMessage.style.visibility = "visible";
    image.style.visibility = "visible";

    // Use animate.css to fade in
    overlay.classList = "overlay animate__animated animate__fadeIn animate__delay-1s";
    canvas.classList = "animate__animated animate__fadeIn animate__delay-2s";

    setTimeout(() => {
      scene.add(faceModel);
      faceModel.position.z = 1025;
      hasModelLoaded = true;
      headTimeline = new TimelineMax();

      // Animate model from far away to screen...
      const tl = new TimelineMax();
      tl.to(faceModel.position, 2, {z: 3.8, ease: "power4.out", onComplete: () => isAnimationComplete = true})
    }, 750); //...with 750ms delay
  }
}, (e) => onError({error: {message: e}}));

// Create array of all lights
const allLights = [
  pointLightLeft,
  pointLightRight,
  ambientLight,
];

// Spread array and add to scene
scene.add(...allLights);

// New clock for floating object
const clock = new THREE.Clock();

// Animation loop function...
function animate() {
  requestAnimationFrame(animate);
  
  // Only manipulate model if loaded
  if (hasModelLoaded) {
    // If mouse is on screen, rotate model towards mouse pos
    if (isMouseOnScreen) {
      faceModel.rotation.y = THREE.MathUtils.lerp(faceModel.rotation.y - 0.17, (mouseX * Math.PI) / 4000, 0.1)
      faceModel.rotation.x = THREE.MathUtils.lerp(faceModel.rotation.x - 0.01, -((mouseY * Math.PI) / 5000), 0.1)
    }

    // If initial animation is complete, start floating
    if (isAnimationComplete) {
      const time = clock.getElapsedTime();
      faceModel.position.z = 3.8 + Math.cos(time) * 0.005;
    }
  }

  // Render scene...
  renderer.render(scene, camera);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
}

function onMouseLeave(event) {
  if (event.clientY <= 0 || event.clientX <= 0 || (event.clientX >= window.innerWidth || event.clientY >= window.innerHeight)) {  
    isMouseOnScreen = false;
    globalTimeline = new TimelineMax().delay(1);
    globalTimeline.to(faceModel.rotation, 1, {x: -0.1, y: -1.5, ease: Sine.easeOut});
  }
}

function onMouseEnter() {
  if (hasModelLoaded) {
    isMouseOnScreen = true;
    if (globalTimeline) globalTimeline.kill();
  }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function setWireframe(bool) {
  faceModel.traverse((node) => {
    if (!node.isMesh) return;
    node.material.wireframe = bool;
  });
}

function toggleWireframe() {
  setWireframe(isWireframeActive ? false : true);
}

Array.prototype.first = function() {
  if (this) return this[0];
  else return [];
}

animate();
