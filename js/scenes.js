//  scenes.js

    var Scenes = [];  // object with array properties.

//  Array's elements are referenced in initial elements. (this is good).

    var documentBodySelector = document.body;
    var sceneContainerSelector = "#render-container";
    var container = $(sceneContainerSelector)[0];
    var fontPath = "/three/r78/js/fonts/helvetiker_regular.typeface.json";

    var playerRadius = 1;
    var startPoint = new THREE.Vector3( 0, 250, 0 );

    var scene, 
        camera, 
        renderer, 
        controls;

    var sceneLights, 
        axisCustomHelper, 
        axisOriginHelper;

    var projector, 
        keyboard, 
        clock;

    var scenename = "Webspace";


;( function( THREE ){

    scene = new THREE.Scene();
    scene.name = scenename;

    camera = createFpsCamera(50, 1, 10000);
    camera.position.set(0, 20, 100);
//  controls = new THREE.EditorControls(camera);

    scene.add(directionalLight(0xffffff,  1000, 1000,  1000, 0.5));
    scene.add(directionalLight(0xffffff,  1000, 1000, -1000, 0.5)); 
    scene.add(directionalLight(0xffffff, -1000, 1000,  1000, 0.5)); 
    scene.add(directionalLight(0xffffff, -1000, 1000, -1000, 0.5));
    scene.add(directionalLight(0xffffff,     0,-5000,     0, 0.3));

    groundHelper = newGroundHelper(1000, 10);  
    groundHelper.visible = true;
    axisCustomHelper = newCustomAxisHelper(5200);
    axisOriginHelper = newOriginAxisHelper(1200);

    projector = new THREE.Projector();
//  keyboard = new KeyboardState();
    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
    });

    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    Scenes[scenename] = scene;

})( THREE );


function sceneBackground( path ){
    if (!!scene && Number(THREE.REVISION) >= 78) {

        skyboxfolder = path;
        var loader = new THREE.CubeTextureLoader();
        var urls = [
            skyboxfolder + "posx.jpg", 
            skyboxfolder + "negx.jpg", 
            skyboxfolder + "posy.jpg", 
            skyboxfolder + "negy.jpg", 
            skyboxfolder + "posz.jpg", 
            skyboxfolder + "negz.jpg"
        ];
        loader.load( urls, function(texture){
        //  debugMode && console.log("cube texture loaded:", url);
            scene.background = texture;
            scene.background.needsUpdate = true;
        });
    }
}

