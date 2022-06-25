<template>
  <div id="canvas" ref="canvas"></div>
</template>

<script>
// Store imports
import {useMainStore} from "../stores/MainStore";

// Library imports
import * as THREE from "three"
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

export default {
  name: "TheCanvas",
  created() {
    // Initialise scene, camera, renderer etc...
    this.init();
    this.scene.add(this.camera);

    // Stage lights and add to scene
    this.pointLightLeft.position.set(-4, 0, 7);
    this.pointLightRight.position.set(4, -1, 6);
    this.scene.add(this.pointLightLeft, this.pointLightRight, this.ambientLight);

    // Set defualt renderer properties
    this.renderer.setClearColor(0xff0000, 0);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.render(this.scene, this.camera);
    this.camera.rotation.y = 3.135;
    
    this.loader.load(new URL(`../assets/models/akif.glb`, import.meta.url).href, (gltf) => {
      this.faceModel = gltf.scene;
      this.faceModel.traverse((node) => {
        if (!node.isMesh) return;
        node.material.wireframe = true;
      });
      this.faceModel.position.z = 3.8;
      this.faceModel.rotation.x = -0.1;
      this.faceModel.rotation.y = -1.5;
      this.scene.add(this.faceModel);
    }, (xhr) => {
      this.loaded = (xhr.loaded / xhr.total * 100).toFixed(2);
    })
  },
  mounted() {
    // Set renderer to the div size
    this.camera.aspect = this.$refs.canvas.clientWidth / this.$refs.canvas.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.$refs.canvas.clientWidth, this.$refs.canvas.clientHeight);
    
    this.$refs.canvas.appendChild(this.renderer.domElement)
    this.animate()
  },
  methods: {
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
    init() {
      this.loader = new GLTFLoader();
      // Generate Three.js scene, camera and renderer
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
      this.renderer = new THREE.WebGL1Renderer({
        antialias: true,
      })
      // Create lights for scene
      this.pointLightLeft = new THREE.PointLight(0xffffff, 0.5);
      this.pointLightRight = new THREE.PointLight(0xffffff, 0.5);
      this.ambientLight = new THREE.AmbientLight(0xffffff, 1.7)
      // Create clock for floating object
      this.clock = new THREE.Clock();
      this.faceModel;
    },
  },
}
</script>

<style scoped>
  div {
    width: 100%;
    height: 100%;
  }
</style>