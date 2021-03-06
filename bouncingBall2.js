if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

var camera, scene, renderer;
var ball, ballMaterial, ballMesh;
var floor, floorMaterial, floorMesh;
var ballDiameter = 0.3;

var serverDate;

var displayCounter = function (){
	this.serverDateUpdate = ServerDate.now()/1000
	this.ServDate = Math.abs(Math.sin(this.serverDateUpdate));
	document.getElementById('sinAbs').innerHTML = this.ServDate;
	if(this.ServDate < 0.01){
		document.getElementById('sinAbs').innerHTML = 'puto';
		console.log('puto');
		console.log(this.serverDateUpdate);
		console.log(this.serverDateUpdate%3.14);
	}
}

function init (){
	var container = document.getElementById('container');
	

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xbbbbbb);
	

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 100);
	camera.position.set(0,5,8);
	camera.lookAt(scene.position);


	var ambientLight = new THREE.AmbientLight (0xcccccc,0.4);
	scene.add(ambientLight);

	var directionalLight = new THREE.DirectionalLight (0xffffff,0.66);
	directionalLight.position.set( 0, 7, 7 );
	scene.add(directionalLight);

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


	var floorGeometry = new THREE.PlaneBufferGeometry( 10, 10 );
	var floorMaterial = new THREE.MeshLambertMaterial( { color: 0xeeeeee } );
	var floor = new THREE.Mesh( floorGeometry, floorMaterial );
	floor.rotation.x = Math.PI * - 0.5;
	floor.receiveShadow = true;
	scene.add( floor );


	var ballGeometry = new THREE.SphereBufferGeometry(ballDiameter,32,16);
	ballGeometry.translate(0,ballDiameter,0);
	var ballMaterial = new THREE.MeshLambertMaterial({color:0x0088cc});
	ball = new THREE.Mesh(ballGeometry, ballMaterial);
	ball.castShadow = true;
	ball.userData.down = false;
	scene.add(ball);


	renderer = new THREE.WebGLRenderer({antialias : true});
	renderer.shadowMap.enabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	//renderer.setClearColor(0x000000);
	renderer.shadowMapSoft = true;
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);


	controls = new THREE.OrbitControls( camera, renderer.domElement);
	controls.maxPolarAngle = Math.PI/2.1; 


	window.addEventListener( 'resize', function () {
		var width = window.innerWidth;
		var height = window.innerHeight;
		renderer.setSize( width, height );
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	} );
}

function animate(time){
	displayCounter();
	serverDate = ServerDate.now();
	//ball.position.y = (Math.abs( Math.sin( serverDate /1000 ) ) * 2);
	ball.position.y = this.ServDate * 2.7;
	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

init();
animate();