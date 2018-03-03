//  worlds.js

    var Worlds = [];  // object with array properties.

    var world, groundBody;

//  MESHWALK WORLD.

    world = new MW.World();

//  OCTREE.

//  Make a octree object, which will be the container of rigid objects such as terrain ect.
    partition = 5;
    min = new THREE.Vector3( -5000, -1000, -5000 );
    max = new THREE.Vector3(  5000,  1000,  5000 );
    octree = new MW.Octree( min, max, partition );
    world.add( octree );

//  Ground. (its going after cameraControls created)
    var ground = new THREE.Mesh(
        new THREE.PlaneGeometry( 6000, 6000, 1, 1 ),
        new THREE.MeshBasicMaterial({ 
            color:0x888888,
            transparent:true,
            opacity:0.5, 
            wireframe:false 
        })
    );
    ground.rotation.x = THREE.Math.degToRad( -90 ); // -Math.PI/2

//  We want the ground as collision surface only,
//  so we do not add the ground in the scene.
//  scene.add( ground );

//  Add the ground to WALKMESH world octree object.
//  MESHWALK use octree system to detect collision objects.
    octree.importThreeMesh( ground ); // IMPORTANT //

//  We do not want camera to have collision with any objects,
//  so we do not add ground in cameraControls rigidObjects.
//  cameraControls.rigidObjects.push( ground );

    Worlds[scenename] = world;











































