// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
// import { Color } from "three";
// const scene = new THREE.Scene()
// const camera = new THREE.PerspectiveCamera(
//   75,
//   200 / 200,
//   0.1,
//   900
// )
// const camera2 = new THREE.OrthographicCamera(-2,2,2,-2);
// camera2.position.z = 2
// camera.position.z = 2
// const canvas1 = document.getElementById('c1') as HTMLCanvasElement;
// const canvas2 = document.getElementById('c2') as HTMLCanvasElement;
// const renderer1 = new THREE.WebGLRenderer({canvas: canvas1});
//
// const renderer2 = new THREE.WebGLRenderer({canvas: canvas2});
// // const renderer = new THREE.WebGLRenderer()
// renderer1.setSize(200, 200)
// renderer2.setSize(200, 200)
// // document.body.appendChild(renderer.domElement)
// const control1 = new OrbitControls(camera, renderer1.domElement);
// const control2 = new OrbitControls(camera, renderer2.domElement);
// control1.addEventListener('change', render);
// control2.addEventListener('change', render);
// new OrbitControls(camera2, renderer2.domElement);
// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//   color: '#000',
//   wireframe: true,
// })
//
// const cube = new THREE.Mesh(geometry, material)
// scene.add(cube)
// scene.background = new THREE.Color('#ccc')
// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight
//   camera.updateProjectionMatrix()
//   renderer1.setSize(200, 200)
//   renderer2.setSize(200, 200)
//   render()
// }
//
// function animate() {
//   requestAnimationFrame(animate)
//
//   cube.rotation.x += 0.01
//   cube.rotation.y += 0.01
//   // console.log('animate')
//   render()
// }
//
// function render() {
//   renderer1.render(scene, camera)
//   renderer2.render(scene, camera2)
// }
//
// // animate()
// render();
import * as THREE from 'three';
import MyFont from '../fonts/fonts';
let scene: any, camera: any, renderer: any, cube: any, axes: any, sphere: any, torus: any, planet: any, planetGround: any,
  cube1: any, cube2: any, cubeDepth: any, sphereDepth: any, cylinder: any;
let ADD = 0.05;
let donuts: any[] = [];
let rings: any[] = [];
let createCube = function() {
  let geometry = new THREE.BoxGeometry(1,1,1);
  let material = new THREE.MeshBasicMaterial({color: 0x00a1cb});
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
}

let createSphere = function(){
  let geometry = new THREE.SphereGeometry(5,10,10, 0, Math.PI,
    0, Math.PI/2);
  let material = new THREE.MeshBasicMaterial({color: 0x00a1cb,
  wireframe: true});
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);
}
let randomInRange = function(from: number, to: number) {
  let x = Math.random() * (to - from);
  return x + from;
}
let createTorus = function(){
  let geometry = new THREE.TorusGeometry(1,0.5,5,30);
  let material = new THREE.MeshBasicMaterial({color: 0x00a1cb, wireframe: false});
  let torus = new THREE.Mesh(geometry, material);
  torus.position.x = randomInRange(-15, 15);
  torus.position.y = randomInRange(-15, 15);
  torus.position.z = 15;

  scene.add(torus);
  donuts.push(torus);
}
let createPlanet = function(){
  let geometry = new THREE.SphereGeometry(4,30,30);
  let material = new THREE.MeshBasicMaterial({color: 0x8d5524, wireframe: true});
  planet = new THREE.Mesh(geometry, material);
  scene.add(planet);

  let geometryRing = new THREE.TorusGeometry(5.1,0.7,2,50 );
  material = new THREE.MeshBasicMaterial({color: 0xffe39f});
  let ring = new THREE.Mesh(geometryRing, material);
  rings.push(ring);

  geometryRing = new THREE.TorusGeometry(6.9,0.7,2,50 );
  material = new THREE.MeshBasicMaterial({color: 0xffad60});
  ring = new THREE.Mesh(geometryRing, material);
  rings.push(ring);

  geometryRing = new THREE.TorusGeometry(8.5,0.7,2,50 );
  material = new THREE.MeshBasicMaterial({color: 0xeac086});
  ring = new THREE.Mesh(geometryRing, material);
  rings.push(ring);

  rings.forEach((ringItem: any) => {
    ringItem.position.y = 0.5;
    ringItem.rotation.x = 2;
    ringItem.rotation.y = 0.5;
    scene.add(ringItem);
  })

}

let customGeometry = function() {
  // let geometry = new THREE.Geometry();

}
let showHelloWordMyFont = function() {
  // let loader = new THREE.FontLoader();
  // let font = loader.parse(MyFont);
}
let planeGroundGame = function() {
  let geometry = new THREE.PlaneGeometry(1000,1000,50,50);
  let material = new THREE.MeshBasicMaterial({color: 0xa6f995, wireframe: true});
  planetGround = new THREE.Mesh(geometry, material);
  planetGround.rotation.x = Math.PI /2;
  planetGround.position.y = -100;
  scene.add(planetGround);

  geometry = new THREE.BoxGeometry(5,5,5);
  material = new THREE.MeshBasicMaterial({color: 0xc9b92b});
  cube1 = new THREE.Mesh(geometry, material);
  cube1.position.z = -6;
  cube1.position.y = -5;
  scene.add(cube1);

  geometry = new THREE.BoxGeometry(5,5,5);
  material = new THREE.MeshBasicMaterial({color: 0xff0040, transparent: true,opacity: 0.8});
  cube2 = new THREE.Mesh(geometry, material);
  cube2.position.z = 6;
  cube2.position.y = -5;
  scene.add(cube2);
}

let depthMaterial = function(){
  let geometry = new THREE.PlaneGeometry(1000,1000,50,50);
  let material = new THREE.MeshBasicMaterial({color: 0xa6f995, wireframe: true});
  planetGround = new THREE.Mesh(geometry, material);
  planetGround.rotation.x = Math.PI /2;
  planetGround.position.y = -100;
  scene.add(planetGround);

  geometry = new THREE.BoxGeometry(5,5,5);
  material = new THREE.MeshBasicMaterial({color: 0xc9b92b});
  cube1 = new THREE.Mesh(geometry, material);
  cube1.position.z = -6;
  cube1.position.y = -5;
  scene.add(cube1);

  geometry = new THREE.BoxGeometry(5,5,5);
  material = new THREE.MeshBasicMaterial({color: 0xff0040, transparent: true,opacity: 0.8});
  cube2 = new THREE.Mesh(geometry, material);
  cube2.position.z = 6;
  cube2.position.y = -5;
  scene.add(cube2);

  geometry = new  THREE.BoxGeometry(3,2,4);
  let materialDepth = new THREE.MeshDepthMaterial();
   cubeDepth =  new THREE.Mesh(geometry, materialDepth);
  cubeDepth.position.x =- 5;
  cubeDepth.position.z =- 10;
  scene.add(cubeDepth);

  let geometrySphere = new  THREE.SphereGeometry(3,30,30);
   sphereDepth =  new THREE.Mesh(geometrySphere, materialDepth);
  sphereDepth.position.x =5;
  sphereDepth.position.z =0;
  scene.add(sphereDepth);
}

let lineMaterial = function () {
  let geometry = new THREE.CylinderGeometry(3,2,4);
  let material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 1});
  cylinder = new THREE.Line(geometry, material);
  cylinder.position.z = -10;
  cylinder.position.x = -5;
  // geometry.
  scene.add(cylinder);
}
let init = function () {
  // 1. create new scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xcccccc);
  // 2.create an locate the camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z =40;
  camera.position.y =2;

  axes = new THREE.AxesHelper(15);
  scene.add(axes);
  // createCube();
  // createSphere();
  // createTorus();
  // planeGroundGame();
  // depthMaterial();
  lineMaterial();
  // 3. create and locate  the objects on the scene
  // 4. create the renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth,window.innerHeight);

  document.body.appendChild(renderer.domElement);
}
let mainLoop = function () {
  // if(cube){
    // cube.position.x += ADD;
    // cube.rotation.y += ADD;
    // if(cube.position.x <= -3 || cube.position.x >= 3){
    //   ADD *= -1;
    // }
  // }
  // torus.rotation.x += ADD;
  // sphere.rotation.z  += ADD;
  // let x = Math.random();
  // if(x < 0.2){
  //   // createTorus();
  // }
  // donuts.forEach((d: any) => d.position.y -= ADD);
  // camera.position.y += ADD;
 // if(rings && rings.length > 0){
 //   rings[0].rotation.z *= ADD;
 // }
 //  if(planet){
 //
 //  planet.rotation.x += ADD;
 //  }
 //  if(camera.position.y > 5 || camera.position.y < -5){
 //    ADD *= -1;
 //  }
  // createPlanet();

  // cube1.position.x += ADD;
  // cube2.position.x -= ADD;
  // cubeDepth.position.z += ADD;
  // sphereDepth.position.z -= ADD;
  // if(cube1.position.x > 15 || cube1.position.x < -15){
  //   ADD *= -1;
  // }
  renderer.render(scene, camera);
  requestAnimationFrame(mainLoop);
}
init();

mainLoop();
