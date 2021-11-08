import * as THREE from 'three'
import {ParametricGeometry} from 'three/examples/jsm/geometries/ParametricGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);

scene.add(camera);
const hyperbolicHelicoid = createFigyre();
scene.add(hyperbolicHelicoid);

camera.position.z = 5;

const renderer = createRenderer();

animate();

function createFigyre() {
  // const geometry = new THREE.ParametricGeometry(astroidalHelicoidEquantion, 10,30);
  const geometry = new ParametricGeometry(hyperbolicHelicoidEquantion, 100,100);
  const material = new THREE.MeshNormalMaterial();
  return new THREE.Mesh( geometry, material );
}

function createRenderer(){
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  return renderer;
}

function animate() {
  requestAnimationFrame(animate);
  hyperbolicHelicoid.rotation.x += 0.01;
  hyperbolicHelicoid.rotation.y += 0.01;
  renderer.render( scene, camera );
}

function hyperbolicHelicoidEquantion(u, v, target) {
  let alpha = Math.PI * 2 *(u - 0.5);
  let theta = Math.PI * 2 *(v - 0.5);
  let t = 5;
  let bottom = 1 + Math.cosh(alpha)*Math.cosh(theta);

  let x = Math.sinh(alpha)*Math.cos(t*theta)/bottom;
  let z = Math.sinh(alpha)*Math.sin(t*theta)/bottom;
  let y = 1.5*Math.cosh(alpha)*Math.sinh(theta)/bottom;  

  return  target.set(x,y,z);
}
