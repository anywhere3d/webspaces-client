// w3FemaleAssetsLoad.js


//  w3.Female.Body

    var _fmBodyURL   = "/avatar-editor/v/0.2.6/assets/HF_BodyLayer_ABK04_v01.js";
    var _fmDressURL = "/avatar-editor/v/0.2.6/assets/HF_DressLayer_FBK05_v03.js";

    var _fmHairsURL  = "/avatar-editor/v/0.2.5/assets/HF_HairsMediumLayer_FemaleBodyKitv04_v02.js";
    var _fmBraURL  = "/avatar-editor/v/0.2.5/assets/HF_BraLayer_FemaleBodyKitv05_v01.js";
    var _fmPantiesURL = "/avatar-editor/v/0.2.5/assets/HF_PantiesLayer_FemaleBodyKitv05_v01.js";
    var _fmTshirtURL = "/avatar-editor/v/0.2.5/assets/HF_TshirtLayer_FemaleBodyKitv05_v01.js";    
    var _fmTrousersURL = "/avatar-editor/v/0.2.5/assets/HF_TrousersLayer_FemaleBodyKitv05_v02.js";
    var _fmSneakersURL = "/avatar-editor/v/0.2.5/assets/HF_SneakersShoesLayer_AvatarsBodyKitv04_v01.js";

    w3getHttpAvatarAssetPromise( _fmBodyURL, "fmBody" ).then( function(asset){

        var skinUrl = "/avatar-editor/v/0.2.6/female/textures/HF_Skin_Mid.jpg";
        var eyesUrl = "/avatar-editor/v/0.2.6/female/textures/HF_Eyes.jpg";

        var imgSkin = new Image();
        imgSkin.crossOrigin = "anonymous";
        imgSkin.onload = onSkinImageLoad;
        imgSkin.src = skinUrl;

        var imgEyes = new Image();
        imgEyes.crossOrigin = "anonymous";
        imgEyes.onload = onEyesImageLoad;
        imgEyes.src = eyesUrl;

    //  outfit.addToScene("body", asset);

        function onSkinImageLoad(){
            var canvas = makePowerOfTwo( this );
            if (!!canvas){
                var texture = new THREE.Texture( canvas );
                texture.name = "skin_default";
                texture.sourceFile = this.src;
                apply( texture, 0 );
                $(this).remove();
            }
        }

        function onEyesImageLoad(){
            var canvas = makePowerOfTwo( this );
            if (!!canvas){
                var texture = new THREE.Texture( canvas );
                texture.name = "eyes_default";
                texture.sourceFile = this.src;
                apply( texture, 1 );
                $(this).remove();
            }
        }

        function apply( texture, i ){

            if (!asset) {
                var msg = "Outfit <b>body</b> have not been defined!";
                bootboxErrorAlert( msg ); return;
            }

            if ( !!asset.material.materials ) {

                asset.material.materials[i].map = texture;
                asset.material.materials[i].map.needsUpdate = true;
                asset.material.materials[i].needsUpdate = true;

            } else {

                asset.material.map = texture;
                asset.material.map.needsUpdate = true;
                asset.material.needsUpdate = true;
            }

        }
    });

//  w3.Female.Hairs

    w3getHttpAvatarAssetPromise( _fmHairsURL, "fmHairsMedium" ).then( function(asset){

        var url = "/avatar-editor/v/0.2.6/hairs/textures/HAIR133.png";

        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = onImageLoad;
        img.src = url;

   //   outfit.addToScene("hairs", asset);

        function onImageLoad(){
            var canvas = makePowerOfTwo( img );
            if (!!canvas){
                var texture = new THREE.Texture( canvas );
                texture.name = "hairs_default";
                texture.sourceFile = img.src;
                apply( texture );
                $(img).remove();
            }
        }

        function apply( texture ){

            if (!asset) {
                var msg = "Outfit <b>hairs</b> have not been defined!";
                bootboxErrorAlert( msg ); return;
            }

            if ( !!asset.material.materials ) {

            //  asset.material.materials[0].transparent = true;
                asset.material.materials[0].map = texture;
                asset.material.materials[0].map.needsUpdate = true;
                asset.material.materials[0].bumpScale = 0.05;
                asset.material.materials[0].bumpMap = texture;
                asset.material.materials[0].bumpMap.needsUpdate = true;
                asset.material.materials[0].needsUpdate = true;

            } else {

            //  asset.material.transparent = true;
                asset.material.map = texture;
                asset.material.map.needsUpdate = true;
                asset.material.bumpScale = 0.05;
                asset.material.bumpMap = texture;
                asset.material.bumpMap.needsUpdate = true;
                asset.material.needsUpdate = true;
            }

        }
    });


    w3getHttpAvatarAssetPromise( _fmDressURL, "fmDress" ).then( function(asset){

        var url = "/avatar-editor/v/0.2.6/dress3/textures/dress3_DD102.png";

        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = onImageLoad;
        img.src = url;

    //  outfit.addToScene("dress", asset);

        function onImageLoad(){
            var canvas = makePowerOfTwo( img );
            if (!!canvas){
                var texture = new THREE.Texture( canvas );
                texture.name = "dress_default";
                texture.sourceFile = img.src;
                apply( texture );
                $(img).remove();
            }
        }

        function apply( texture ){

            if (!asset) {
                var msg = "Outfit <b>dress</b> have not been defined!";
                bootboxErrorAlert( msg ); return;
            }

            if ( !!asset.material.materials ) {

                asset.material.materials[0].transparent = true;
                asset.material.materials[0].map = texture;
                asset.material.materials[0].map.needsUpdate = true;
                asset.material.materials[0].bumpScale = 0.05;
                asset.material.materials[0].bumpMap = texture;
                asset.material.materials[0].bumpMap.needsUpdate = true;
                asset.material.materials[0].needsUpdate = true;

            } else {

                asset.material.transparent = true;
                asset.material.map = texture;
                asset.material.map.needsUpdate = true;
                asset.material.bumpScale = 0.05;
                asset.material.bumpMap = texture;
                asset.material.bumpMap.needsUpdate = true;
                asset.material.needsUpdate = true;
            }

        }

    });


//  w3.Female.Tshirt

    w3getHttpAvatarAssetPromise( _fmTshirtURL, "fmTshirt" ).then( function(asset){
    
    //  var url = "https://i.imgur.com/PdjMvia.png";
        var url = "/avatar-editor/v/0.2.6/textures/white_strips.png";
    
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = onImageLoad;
        img.src = url;

    //  outfit.addToScene("tshirt", asset);

        function onImageLoad(){
            var canvas = makePowerOfTwo( img );
            if (!!canvas){
                var texture = new THREE.Texture( canvas );
                texture.name = "tshirt_default";
                texture.sourceFile = img.src;
                apply( texture );
                $(img).remove();
            }
        }

        function apply( texture ){

            if (!asset) {
                var msg = "Outfit <b>tshirt</b> have not been defined!";
                bootboxErrorAlert( msg ); return;
            }

            if ( !!asset.material.materials ) {

                asset.material.materials[0].transparent = true;
                asset.material.materials[0].map = texture;
                asset.material.materials[0].map.needsUpdate = true;
                asset.material.materials[0].bumpScale = 0.05;
                asset.material.materials[0].bumpMap = texture;
                asset.material.materials[0].bumpMap.needsUpdate = true;
                asset.material.materials[0].needsUpdate = true;

            } else {

                asset.material.transparent = true;
                asset.material.map = texture;
                asset.material.map.needsUpdate = true;
                asset.material.bumpScale = 0.05;
                asset.material.bumpMap = texture;
                asset.material.bumpMap.needsUpdate = true;
                asset.material.needsUpdate = true;
            }

        }

    }).then( function(){
    
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = onImageLoad;
        img.src = "/avatar-editor/v/0.2.6/textures/put_image_here.jpg"; // tshirtDefaultImg; // 

        function onImageLoad(){
            var texture = new THREE.Texture( img );
            
            try {
        
                if ( !!outfit.tshirt && !!outfit.tshirt.material.materials && outfit.tshirt.material.materials.length > 1) {
                    outfit.tshirt.material.materials[0].color.setHex(0x9c9c9c);
                    outfit.tshirt.material.materials[1].map = texture;
                    outfit.tshirt.material.materials[1].map.needsUpdate = true;
                    outfit.tshirt.material.materials[1].bumpScale = 0.05;
                    outfit.tshirt.material.materials[1].bumpMap = texture;
                    outfit.tshirt.material.materials[1].bumpMap.needsUpdate = true;
                    outfit.tshirt.material.materials[1].needsUpdate = true;
                }
                
            } catch(err) {
                
                debugMode && console.log( err );
                
            }
        }

    });

//  w3.Female.OutfitAssets

    w3getHttpAvatarAssetPromise( _fmBraURL, "fmBra" ).then( function(asset){
    //  outfit.addToScene("bra", asset);
    });

    w3getHttpAvatarAssetPromise( _fmPantiesURL, "fmPanties" ).then( function(asset){
    //  outfit.addToScene("panties", asset);
    });

    w3getHttpAvatarAssetPromise( _fmTrousersURL, "fmTrousers" ).then( function(asset){
    //  outfit.addToScene("trousers", asset);
    });

    w3getHttpAvatarAssetPromise( _fmSneakersURL, "fmSneakers" ).then( function(asset){
    //  outfit.addToScene("shoes", asset);
    });












