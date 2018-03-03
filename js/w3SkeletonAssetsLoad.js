//  w3SkeletonAssetsLoad.js


    var _skinUrl       = "/avatar-editor/v/0.2.6/textures/wooden_roses.jpg";
    var _skeletonURL   = "/avatar-editor/v/0.2.6/assets/HF_MannySkeleton_ABK04_v01.js";

    w3getHttpAvatarAssetPromise( _skeletonURL, "skeleton" ).then( function(asset){

        var url = "/avatar-editor/v/0.2.6/textures/wooden_roses.jpg";

        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = onImageLoad;
        img.src = url;

   //   outfit.addToScene("body", asset);

        function onImageLoad(){
            var canvas = makePowerOfTwo( img );
            if (!!canvas){
                var texture = new THREE.Texture( canvas );
                texture.name = "skeleton_default";
                texture.sourceFile = img.src;
                apply( texture );
                $(img).remove();
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


