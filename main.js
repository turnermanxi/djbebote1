import './style.css';
import * as THREE from 'three';
import { soundCloudApp } from './soundcloud.js';
import { songChanger } from './soundcloud.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';




var container;


var camera, scene, renderer;



init();
animate();





function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 1, 100 );
	camera.position.y = 2;
  camera.position.z = 1;
  camera.position.x = 0;

	// scene

	scene = new THREE.Scene();

  
  
  const intersectionPoint = new THREE.Vector3();
  const planeNormal = new THREE.Vector3();
  const plane = new THREE.Plane();
  const mousePosition = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();


  



	var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );
  
  

	var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  pointLight.position.set(20,20,20)
	camera.add( pointLight );
	scene.add( camera );

  //var lightHelper = new THREE.PointLightHelper(pointLight)
  //var gridHelper = new THREE.GridHelper(200,50);
  //scene.add(lightHelper, gridHelper);

  function addStar(){
    var geometry = new THREE.SphereGeometry(0.25, 24, 24);
    var material = new THREE.MeshStandardMaterial({color: 0xffffff});
    var star = new THREE.Mesh( geometry, material );

    var [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star)
  }
  Array(200).fill().forEach(addStar)

  const spaceTexture = new THREE.TextureLoader().load('danny_lacrue_6.jpg');
  scene.background = spaceTexture;

	// model

  
function loadOBJWithMTL() {
  const mtlLoader = new MTLLoader();
  mtlLoader.load('bebo3.mtl', ( material ) => {
    material.preload();
    const loader = new OBJLoader();
	  loader.load('djbebote.obj', ( obj ) => {
		// center asset
    
		  var box = new THREE.Box3().setFromObject( obj );
		  var center = new THREE.Vector3();
		  box.getCenter( center );
		  obj.position.sub( center );
      

      obj.rotation.x += 0.01;
      obj.rotation.y += 0.009;
      obj.rotation.z += 0.008;

    

		// add to scene
		scene.add( obj );
    
    
    const spotLight = new THREE.SpotLight(0xffffff, 4000, 100, 100, 1);
    spotLight.position.set(0, 25, 0);
    scene.add(spotLight);

	}, undefined, function (error) {
    console.error('An error happened while loading the OBJ file:', error);
  });
  }, undefined, function(error) {
    console.error('An error happened while loading the MTL file:', error);
  });
}

loadOBJWithMTL('djbebote.obj', 'bebo3.mtl');

  const loader = new OBJLoader();
	  loader.load('radio.obj', ( obj ) => {
		// center asset
    
		  var box = new THREE.Box3().setFromObject( obj );
		  var center = new THREE.Vector3();
		  box.getCenter( center );
		  obj.position.sub( center );

      obj.position.y = 3;
      obj.position.x = -3.3;
      obj.position.z = -9;

      obj.scale.x = -.1;
      obj.scale.y = -.1;
      obj.scale.z = -.1;


      obj.rotation.x += -.05;
      obj.rotation.y += -2.1;
      obj.rotation.z += -2.1;

    

		// add to scene
		scene.add( obj );
    
    
    const spotLight = new THREE.SpotLight(0xffffff, 4000, 100, 100, 1);
    spotLight.position.set(25, 25, 25);
    scene.add(spotLight);

	});
  

	renderer = new THREE.WebGLRenderer();
  
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth / 1.15, window.innerHeight / 1.15);
  camera.position.setZ(5)
  
	container.appendChild( renderer.domElement );



	

	//

	window.addEventListener( 'resize', onWindowResize, false );

  
}

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0005;
  camera.rotation.y = t * -0.0005;

  obj.rotation.x += 0.01
  obj.rotation.y += 0.009;
  obj.rotation.z += 0.008;
}

document.body.onscroll = moveCamera




function onWindowResize() {

	camera.aspect = 150 / 2, 100 / 2 ;
	camera.updateProjectionMatrix();

	renderer.setSize( 125 / 2, 100 / 2  );

  if(camera.aspect>1){
    camera.position.z = 0.01 / camera.aspect;
  }else{
    camera.position.z= 0.01;
  }

}

//

function animate() {

	requestAnimationFrame( animate );

    
  renderer.render( scene, camera );

}

songChanger();

soundCloudApp();








  



 