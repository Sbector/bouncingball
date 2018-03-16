var camera, scene, renderer;
var geometry, material, mesh;
var plane, planeMat, planeGeo;
var fecha;

var counter;

var spotLight;

function init() {
	//scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xeeeeee );
	//cámara
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 500 );
	camera.position.x = 0;
	camera.position.y = 5;
	camera.position.z = 25;
	camera.lookAt(scene.position);
	//mesh
	geometry = new THREE.SphereGeometry( 1 , 200, 200);
	material = new THREE.MeshLambertMaterial({color:0x0088aa});
	mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = true;
	scene.add( mesh );
	//controls

	//controls = new THREE.TrackballControls( camera );


	//light
	spotLight = new THREE.SpotLight(0xffffff);
	spotLight.castShadow = true;
	spotLight.position.set(15,30,50);
	scene.add(spotLight);
	//renderer
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.shadowMap.enabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;


	controls = new THREE.OrbitControls( camera, renderer.domElement);
	controls.maxPolarAngle = Math.PI/4; 

	window.addEventListener( 'resize', function () {
		var width = window.innerWidth;
		var height = window.innerHeight;
		renderer.setSize( width, height );
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	} );

	document.body.appendChild( renderer.domElement );				
				
}

function animate( time ) {
	//Llamar fecha actual en ms
	fecha = new Date().getTime();
	//Cambiar posición de mesh en base al valor absoluto de seno de fecha
	mesh.position.y = (Math.abs( Math.sin( fecha /600 ) ) * 8-2);
	//Revisión de valores de fecha cuando mesh.position.y < 0
	if(mesh.position.y < 0.001) {
		console.log(fecha);
		console.log(mesh.position.y);
	}
	//controls
	//controls.update();


	renderer.render( scene, camera );
	requestAnimationFrame( animate );

}

init();
requestAnimationFrame( animate );