// w3MaleAssetsLoad.js


//  w3.Male.Body

    var _hmBodyURL   = "/avatar-editor/v/0.2.6/assets/HM_BodyLayer_ABK04_v01.js";    
    var _hmTshirtURL = "/avatar-editor/v/0.2.6/assets/HM_TshirtLayer_MBK05_v01.js";    

    var _hmHairsURL  = "/avatar-editor/v/0.2.5/assets/HM_HairsMediumLayer_MaleBodyKitv04_v01.js";
    var _hmBoxersURL  = "/avatar-editor/v/0.2.5/assets/HM_BoxersLayer_MaleBodyKitv4_v01.js";
    var _hmTrousersURL = "/avatar-editor/v/0.2.5/assets/HM_TrousersLayer_MaleBodyKitv4_v01.js";
    var _hmSneakersURL = "/avatar-editor/v/0.2.5/assets/HM_SneakersShoesLayer_AvatarsBodyKitv04_v01.js";

    w3getHttpAvatarAssetPromise( _hmBodyURL, "hmBody" ).then( function(asset){

        var skinUrl = "/avatar-editor/v/0.2.6/male/textures/HM_Skin_Mid.jpg";
        var eyesUrl = "/avatar-editor/v/0.2.6/male/textures/HM_Eyes.jpg";

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

//  w3.Male.OutfitAssets

    w3getHttpAvatarAssetPromise( _hmHairsURL, "hmHairsMedium" ).then( function(asset){

        var url = "/avatar-editor/v/0.2.6/hairs/textures/HAIR137.png";

        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = onImageLoad;
        img.src = url;

    //  outfit.addToScene("hairs", asset);

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

    w3getHttpAvatarAssetPromise( _hmTrousersURL, "hmTrousers" ).then( function(asset){
    //  outfit.addToScene("trousers", asset);
    });

    w3getHttpAvatarAssetPromise( _hmTshirtURL, "hmTshirt" ).then( function(asset){
    
    //  var url = "https://i.imgur.com/PdjMvia.png";
    //  var url = "https://i.imgur.com/lMRdRRP.jpg";
    //  var url = "/avatar-editor/v/0.2.6/textures/white_strips.png";
        var url = "/avatar-editor/v/0.2.6/textures/woolen_fabric_9271298.jpg";
    
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

                asset.material.materials[0].map = texture;
                asset.material.materials[0].map.needsUpdate = true;
                asset.material.materials[0].bumpScale = 0.05;
                asset.material.materials[0].bumpMap = texture;
                asset.material.materials[0].bumpMap.needsUpdate = true;
                asset.material.materials[0].needsUpdate = true;

            } else {

                asset.material.map = texture;
                asset.material.map.needsUpdate = true;
                asset.material.bumpScale = 0.05;
                asset.material.bumpMap = texture;
                asset.material.bumpMap.needsUpdate = true;
                asset.material.needsUpdate = true;
            }

        }

    });

    w3getHttpAvatarAssetPromise( _hmSneakersURL, "hmSneakers" ).then( function(asset){
    //  outfit.addToScene("shoes", asset);
    });

    w3getHttpAvatarAssetPromise( _hmBoxersURL, "hmBoxers" ).then( function(asset){
    //  outfit.addToScene("hmBoxers", asset);
    });







