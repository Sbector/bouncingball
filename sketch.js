var camera, scene, renderer;
var geometry, material, mesh;
var plane, planeMat, planeGeo;

var ambient, spotLight;

function init() {
	//scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );
	//cámara
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 500 );
	camera.position.x = 0;
	camera.position.y = 10;
	camera.position.z = 20;
	camera.lookAt(scene.position);
	//mesh
	geometry = new THREE.SphereGeometry( 1 , 50, 50);
	material = new THREE.MeshLambertMaterial({color:0x0088aa});
	mesh = new THREE.Mesh( geometry, material );
	mesh.castShadow = true;
	scene.add( mesh );
	//plane
	//planeGeo = new THREE.PlaneGeometry(30,30,30);
	//planeMat = new THREE.MeshLambertMaterial({color:0xffffff});
	//plane = new THREE.Mesh(planeGeo, planeMat);
	//plane.rotation.x = -0.5 * Math.PI;
	//plane.reciveShadow = true;
	//scene.add(plane);

	//controls
	controls = new THREE.TrackballControls( camera );

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

	document.body.appendChild( renderer.domElement );				
				
}

function animate( time ) {

	//mesh.rotation.x = time * 0.0005;
	//mesh.rotation.y = time * 0.001;
	//var y = 2.5;
	//mesh.position.y = y;
	mesh.position.y = Math.abs( Math.sin( time * 0.002 ) ) * 10;
	//mesh.position.y = time * -0.0005;

	//controls
	controls.update();

	renderer.render( scene, camera );
	requestAnimationFrame( animate );

}

init();
requestAnimationFrame( animate );