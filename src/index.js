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
  const geometry = new ParametricGeometry(hyperbolicHelicoidEquantion, 50,50);
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

function getRotationMatrix(alpha, beta, gamma) {
  var degtorad = Math.PI / 180; // Degree-to-Radian conversion
  var _x = beta ? beta * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value
  
  var cX = Math.cos(_x);
  var cY = Math.cos(_y);
  var cZ = Math.cos(_z);
  var sX = Math.sin(_x);
  var sY = Math.sin(_y);
  var sZ = Math.sin(_z);
  
  //
  // ZXY rotation matrix construction.
  
  var m11 = cZ * cY - sZ * sX * sY;
  var m12 = -cX * sZ;
  var m13 = cY * sZ * sX + cZ * sY;
  
  var m21 = cY * sZ + cZ * sX * sY;
  var m22 = cZ * cX;
  var m23 = sZ * sY - cZ * cY * sX;
  
  var m31 = -cX * sY;
  var m32 = sX;
  var m33 = cX * cY;
  
  return [m11, m12, m13, m21, m22, m23, m31, m32, m33];
  }
  
  var threejs_matrix4 = new THREE.Matrix4();
  
  window.addEventListener('deviceorientation', e => {
  var m2 = getRotationMatrix(e.alpha, e.beta, e.gamma);
  
  threejs_matrix4.set(
    m2[0], m2[1], m2[2], 0,
    m2[3], m2[4], m2[5], 0,
    m2[6], m2[7], m2[8], 0,
    0, 0, 0, 1
  );
  hyperbolicHelicoid.rotation.setFromRotationMatrix(threejs_matrix4);
  
  renderer.render(scene, camera);
  });
