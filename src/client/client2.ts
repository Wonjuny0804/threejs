import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import { CubeReflectionMapping } from 'three';

const scene = new THREE.Scene();
scene.autoUpdate = true;
const backgroundColor = new THREE.Color("rgb(255, 255, 255)");
scene.background = backgroundColor;

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  10,
  1000
);

const light = new THREE.PointLight(0xffffff, 3)
light.position.set(10, 10, 10)
scene.add(light)

camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.TorusGeometry( 5, 3, 30, 500);

const material = new THREE.MeshStandardMaterial({ 
  color: 0x68bea,
  roughness: 1,
  metalness: 1,
  flatShading: true,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

new OrbitControls(camera, renderer.domElement);

const gui = new GUI();
gui.add(camera.position, "z", 0, 1000);
gui.add(torus.rotation, "x", 0, Math.PI * 2);
gui.add(torus.rotation, "y", 0, Math.PI * 2);
gui.add(torus.rotation, "z", 0, Math.PI * 2);

const data = {
  color: material.color.getHex(),
  emissive: material.emissive.getHex(),
}

const meshStandardMaterialFolder = gui.addFolder('THREE.MeshStandardMaterial');
meshStandardMaterialFolder.addColor(data, 'color').onChange(() => {
  material.color.setHex(Number(data.color.toString().replace('#', '0x')))
});

meshStandardMaterialFolder.addColor(data, 'emissive').onChange(() => {
  material.emissive.setHex(
      Number(data.emissive.toString().replace('#', '0x'))
  )
});

meshStandardMaterialFolder.updateDisplay();
meshStandardMaterialFolder.add(material, 'wireframe')
meshStandardMaterialFolder
  .add(material, 'flatShading')
  .onChange(() => updateMaterial())
meshStandardMaterialFolder.add(material, 'roughness', 0, 1);
meshStandardMaterialFolder.add(material, 'metalness', 0, 1);
// meshStandardMaterialFolder.add(material, 'tubularSegments', 0, 100);
// meshStandardMaterialFolder.add(material, "radialSegments", 0, 30);
meshStandardMaterialFolder.open()

function updateMaterial() {
  material.side = Number(material.side)
  material.needsUpdate = true
}


function animate() {
  requestAnimationFrame(animate)

  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();