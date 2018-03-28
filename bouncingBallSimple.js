var scene, camera, renderer, audio;
var ball;

init();

function init() {
	var container = document.getElementById('container');

	scene = new THREE.Scene();
	// cámara
	camera = new THREE.PerspectiveCamera (45, window.innerWidth / window.innerHeight, 0.1,100);
	camera.position.set(7,3,7);
	// luces
	var ambientLight = new THREE.AmbientLight (0xcccccc,0.4);
	scene.add(ambientLight);
	//
	var directionalLight = new THREE.DirectionalLight (0xffffff,0.7);
	directionalLight.position.set( 0, 5, 5 );
	scene.add(directionalLight);
	//
	var d = 5;
	directionalLight.castShadow = true;
	directionalLight.shadow.camera.left = - d;
	directionalLight.shadow.camera.right = d;
	directionalLight.shadow.camera.top = d;
	directionalLight.shadow.camera.bottom = - d;
	directionalLight.shadow.camera.near = 1;
	directionalLight.shadow.camera.far = 20;
	directionalLight.shadow.mapSize.x = 1024;
	directionalLight.shadow.mapSize.y = 1024;

	//
	var floorGeometry = new THREE.PlaneBufferGeometry( 10, 10 );
	var floorMaterial = new THREE.MeshLambertMaterial( { color: 0x4676b6 } );
	var floor = new THREE.Mesh( floorGeometry, floorMaterial );
	floor.rotation.x = Math.PI * - 0.5;
	floor.receiveShadow = true;
	scene.add( floor );

	//
	var ballGeometry = new THREE.SphereBufferGeometry(0.3,32,16);
	ballGeometry.translate(0,0.3,0);
	var ballMaterial = new THREE.MeshLambertMaterial({color:0xcccccc});

	ball = new THREE.Mesh(ballGeometry, ballMaterial);
	ball.castShadow = true;
	ball.userData.down = false;
	scene.add(ball);

	animate();

	renderer = new THREE.WebGLRenderer({antialias : true});
	renderer.shadowMap.enabled = true;
	renderer.serSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);

	var controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 1;
	controls.maxDistance = 25;

	window.addEventListener( 'rezise', onWindowResize, false);
}

function onWindowResize (event){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate () {
	requestAnimationFrame(animate);

	render();
}

var speed = 1.7;
var height = 3;
var offset = 0.05;
var time = 0;

function render(){
	time += 0.02;

	var previousHeight = ball.position.y;
	ball.position.y = Math.abs(Math.sin(time * speed)* height);
	if(ball.position.y < previousHeight){
		ball.userData.down = true;
	}else{
		if(ball.userData.down === true){
			console.log(bote);
			ball.userData.down = false;
		}
	}
	renderer.render( scene, camera );

}