
//  w3AnimationsLoad.js

    var _idleURL = "/avatar-editor/v/0.2.6/animations/AvatarsBodyKitv04_idle_v001.js";
    var _walkURL = "/avatar-editor/v/0.2.6/animations/male_walkcycle_animation_v1_1sec.js";
    var _runURL  = "/avatar-editor/v/0.2.6/animations/male_walkcycle_animation_v1_1sec.js";
    var _jumpURL = "/avatar-editor/v/0.2.6/animations/basic_jumping_animation_v3_1_5sec.js";

    w3.getHttpObject( _idleURL, function(json){
        Animations[ "idle" ] = json;
    });
    w3.getHttpObject( _walkURL, function(json){
        Animations[ "walk" ] = json;
    });
    w3.getHttpObject( _runURL, function(json){
        Animations[ "run" ] = json;
    });
    w3.getHttpObject( _jumpURL, function(json){
        Animations[ "jump" ] = json;
    });
