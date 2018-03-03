//  /sockets/add_player.js

/*!
* @author anywhere3d
* http://anywhere3d.org
* MIT License
*/

socket.on("add player", function(data) {

    debugMode && console.log("Received an 'add player' message from the server:", data);
    if ( !data ) { debugMode && console.log("Ignoring 'add player' message. No data found:", data); return; }
    if ( !data.clientid ) { debugMode && console.log("Ignoring 'add player' message. ClientID does not exists:", data.clientid); return; }

//  REMOTE PLAYER.

    var remotePlayer = new AW3D.RemotePlayer();

    remotePlayer.status    = data;

    remotePlayer.clientid  = data.clientid;
    remotePlayer.namespace = data.namespace;
    remotePlayer.nickname  = data.nickname;
    remotePlayer.gender    = data.gender;


//  remotePlayer.animationHandlers = new AW3D.OutfitAnimationHandler; // array-like object.

    var playerHolder, 
        playerHolderHelper,
        directionPointer,
        playerSphere,
        playerPointer;

    var playerController;
    
    var outfit;

    AW3D.PlayerHolder().then(function( holder ){

    //  REMOTE PLAYER HOLDER.

        playerHolder = holder;
        playerHolderHelper = AW3D.PlayerHolderHelper();
        scene.add( playerHolder, playerHolderHelper );
        remotePlayer.playerHolder = playerHolder;
        remotePlayer.helpers.playerHolderHelper = playerHolderHelper;

        directionPointer = AW3D.DirectionPointer();
        playerSphere = AW3D.PlayerSphere();
        playerHolder.add( directionPointer, playerSphere ); 
        remotePlayer.helpers.playerSphere = playerSphere;
        remotePlayer.helpers.directionPointer = directionPointer;

    //  playerPointer = AW3D.PlayerPointer();
    //  scene.add(playerPointer);
    //  remotePlayer.helpers.playerPointer = playerPointer;

        remotePlayer.helpers.visible(true);

//    }).then(function(){

    //  REMOTE PLAYER CONTROLLER

        playerController = new MW.CharacterController( playerHolder, playerRadius );

        playerController.setData = function(data){

            if ( !data || !data.clientid ) return;
            if ( data.namespace  != null ) this.namespace = data.namespace;
            if ( data.clientid   != null && !this.clientid ) this.clientid = data.clientid;
            if ( data.radius     != null && !this.radius ) this.radius = data.radius;
            if ( data.isGrounded != null ) this.isGrounded = data.isGrounded;
            if ( data.isOnSlope  != null ) this.isOnSlope  = data.isOnSlope;
            if ( data.isIdling   != null ) this.isIdling   = data.isIdling;
            if ( data.isJumping  != null ) this.isJumping  = data.isJumping;
            if ( data.isRunning  != null ) this.isRunning  = data.isRunning;
            if ( data.isWalking  != null ) this.isWalking  = data.isWalking;
            if ( data.direction  != null ) this.direction  = data.direction;
            if ( data.movementSpeed != null ) this.movementSpeed = data.movementSpeed;
            if ( data.jumpStartTime != null ) this.jumpStartTime = data.jumpStartTime;
            if ( data.position   != null ) this.center.fromArray( data.position );
        };

        playerController.addEventListener("deletePlayer", onDelete);

        function onDelete(){

        //  Find controller in world.characterPool.
            var index = world.characterPool.indexOf( playerController );
            debugMode && console.log( "playerController:", "onDelete:", index );

        //  Remove controller from world.
            debugMode && console.log( "world.characterPool.length:", world.characterPool.length );
            if ( index > 0 ) world.characterPool.splice( index, 1 );
            debugMode && console.log( "world.characterPool.length:", world.characterPool.length );
        
        //  Delete controller object (playerHolder).
        //  "playerController.object" ( which is the playerHolder) does not have 
        //  geometry or material to dispose(). It is just a native THREE.Object3D.
        //  playerController.object.parent.remove(playerController.object);
            playerController.object = null;
            console.log("deleting playerController object (playerHolder):", 
            delete playerController.object ); // IMPORTANT //

        //  Remove controller event listeners.
            playerController.removeEventListener("deletePlayer", onDelete);

        //  Delete this player controller.
        //  playerController = null; 
        //  console.log("deleting playerController:", 
        //  delete playerController ); // IMPORTANT //

        //  console.log("deleting remotePlayer:", 
        //  delete remotePlayer ); // IMPORTANT //
        }

    //  Set initial data to remote player controller.
        playerController.setData( data );
        
    //  Add to remote player.
        remotePlayer.playerController = playerController;

    //  Add to world.
        world.add( playerController );

        debugMode && console.log( "world.characterPool:", 
        "index:", world.characterPool.indexOf( playerController ),
        "length:", world.characterPool.length );

    }).then(function(){

    //  REMOTE OUTFIT

        outfit = new AW3D.Outfit( playerController );

        outfit.setGender( data.gender );
        if (!!data.scale) outfit.scale = data.scale;

        if ( !outfit.getGender() ){

            outfit.addsToScene(
                {"body": Avatars["skeleton"]}
            );

        } else if ( outfit.getGender() == "male" ){

            outfit.addsToScene( 
                {"body":     Avatars[ "hmBody" ]},
                {"hairs":    Avatars[ "hmHairsMedium" ]},
                {"tshirt":   Avatars[ "hmTshirt" ]},
                {"trousers": Avatars[ "hmTrousers" ]},
                {"shoes":    Avatars[ "hmSneakers" ]}
            );
        
        } else if ( outfit.getGender() == "female" ){

            outfit.addsToScene( 
                {"body":  Avatars[ "fmBody" ]},
                {"hairs": Avatars[ "fmHairsMedium" ]},
                {"dress": Avatars[ "fmDress" ]},
            //  {"shoes": Avatars[ "hmSneakers" ]};
            );

        }

        outfit.updatePosition();
        var direction = data.direction - Math.PI
        outfit.updateRotation( direction );

    //  Add to remote player.
        remotePlayer.outfit = outfit;

        debugMode && console.log( "remote outfit:", outfit );

    });

//  CONTROL SOCKET EVENTS  //

    socket.on( "player move", function (data) { 
        if ( playerController.clientid != data.clientid ) return;

        debugMode && console.log( playerController.clientid, "say:", 
        "Receiving player move from server:", data.movementSpeed );

        playerController.setData( data );

    //  Update outfit direction.
        var direction = playerController.direction - Math.PI;
        directionPointer.rotation.y = direction;
        outfit.updateRotation( direction );

    //  IMPORTANT: This line after movement speed.
        if ( data.action != null && data.action != "" ){
            outfit.AnimationsHandler.stop();
            outfit.AnimationsHandler.play( data.action );
        }

    });

    socket.on( "player jump", function (data) { 
        if ( playerController.clientid != data.clientid ) return;

        debugMode && console.log( playerController.clientid, "say:", 
        "Receiving player jump from server:", data.movementSpeed );

    //  playerController.setData( data );

    //  playerController.jump();
    //  outfit.AnimationsHandler.jump();

        if ( data.action != null && data.action != "" ){
            outfit.AnimationsHandler.stop();
            outfit.AnimationsHandler.play( data.action );
        }

    });

    socket.on("delete player", function(data) {
        if ( remotePlayer.clientid != data.clientid ) return;

        debugMode && console.log( playerController.clientid, "say:", 
        "Receiving player delete from server:", data.movementSpeed );

        remotePlayer.status = data;

        var removeid = data.clientid;
        debugMode && console.log( "removeid:", removeid );

        RemotePlayersManager.remove( removeid );

    });

//  RemotePlayersManager.

    RemotePlayersManager.push( remotePlayer );
    RemotePlayersManager._players[ data.clientid ] = remotePlayer;

    debugMode && console.log("remotePlayer:", remotePlayer);

});
