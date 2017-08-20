var sceneNum = 0;
function Game() {
    /*Variables*/
    var canvas;
    var engine;
    var scene;
    var cameraWrapper;

    var tank;
    var bullet;
    var bustedTank1;
    var cactus = [];
    var radar = [];
    var cow = [];
    var helipad = [];
    var oilStorage = [];
    var palmTree = [];
    var tree = [];
    var rocks1 = [];
    var rocks2 = [];
    var barrel = [];

    var isWPressed = false;
    var isAPressed = false;
    var isSPressed = false;
    var isDPressed = false;

    var isFPressed = false;
    var isRPressed = false;

    var isPickable = true;
    var isTankReady = false;

    var health1 = 100;
    var greenValue = 255;

/*--------------------------------------------------------------------------------------------------------------------*/

    /*Listeners*/
    document.addEventListener("keyup", function() {
        if (event.key == 'a' || event.key == 'A') {
            isAPressed = false;
        }
        if (event.key == 's' || event.key == 'S') {
            isSPressed = false;
        }
        if (event.key == 'd' || event.key == 'D') {
            isDPressed = false;
        }
        if (event.key == 'w' || event.key == 'W') {
            isWPressed = false;
        }
        if(event.key == 'f' || event.key =='F') {
            isFPressed = false;
        }
        if(event.key == 'r' || event.key =='R') {
            isRPressed = false;
        }
    });
    document.addEventListener("keydown", function() {
        if (event.key == 'a' || event.key == 'A') {
            isAPressed = true;
        }
        if (event.key == 's' || event.key == 'S') {
            isSPressed = true;
        }
        if (event.key == 'd' || event.key == 'D') {
            isDPressed = true;
        }
        if (event.key == 'w' || event.key == 'W') {
            isWPressed = true;
        }
        if(event.key == 'f' || event.key =='F') {
            isFPressed = true;
        }
        if(event.key == 'r' || event.key =='R') {
            isRPressed = true;
        }
    });

    createScene();

    /*Functions*/
    function createSandScene() {
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
        scene = new BABYLON.Scene(engine);
        engine.isPointerLock = true;
        engine.enableOfflineSupport = false;
        scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.CannonJSPlugin());

        var ground = createGround();
        var light = createLight();
        var skybox = createSkybox();

        tank = createTank("tank1.babylon");
        //bustedTank = createBustedTank();

        cactus = createModel("cactus.babylon","cactusMaterial",new BABYLON.Color3(.3,.7,.2),.5,1,.5,10);
        radar = createModel("radar.babylon",null,null,1,1,1,2);
        cow = createModel("cow.babylon",null,null,1,1,1,20);
        helipad = createModel("helipad.babylon",null,null,2,1,2,3);
        oilStorage = createModel("oilStorage.babylon",null,null,3,1,3,2);
        palmTree = createModel("palmTree.babylon",null,null,1.5,1,1.5,10);
        tree = createModel("tree.babylon",null,null,1.5,1,1.5,10);
        rocks1 = createModel("rocks1.babylon",null,null,1,1,1,5);
        rocks2 = createModel("rocks2.babylon",null,null,1,1,1,5);
        barrel = createModel("barrel.babylon",null,null,1,1,1,10);

        waitForIt();
    }

    function createFogScene() {
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
        scene = new BABYLON.Scene(engine);
        engine.isPointerLock = true;
        engine.enableOfflineSupport = false;
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.01;
        scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.CannonJSPlugin());

        var ground = createGround();
        var light = createLight(1);
        var skybox = createSkybox();

        tank = createTank("tank1.babylon");
        //bustedTank = createBustedTank();

        cactus = createModel("cactus.babylon","cactusMaterial",new BABYLON.Color3(.3,.7,.2),.5,1,.5,15);
        radar = createModel("radar.babylon",null,null,1,1,1,2);
        cow = createModel("cow.babylon",null,null,1,1,1,7);
        helipad = createModel("helipad.babylon",null,null,2,1,2,1);
        oilStorage = createModel("oilStorage.babylon",null,null,3,1,3,1);
        palmTree = createModel("palmTree.babylon",null,null,1.5,1,1.5,10);
        tree = createModel("tree.babylon",null,null,1.5,1,1.5,150);
        rocks1 = createModel("rocks1.babylon",null,null,1,1,1,3);
        rocks2 = createModel("rocks2.babylon",null,null,1,1,1,3);
        barrel = createModel("barrel.babylon",null,null,1,1,1,6);

        waitForIt();
    }

    function createScene() {
        if(sceneNum === 0) { createSandScene(); }
        else if(sceneNum === 1) { createFogScene(); }
    }

    function waitForIt(){
        if (isTankReady) {
            var followCamera = createFollowCamera();
            scene.activeCamera = followCamera;
            scene.collisionsEnabled = true;

            followCamera.attachControl(canvas);
            followCamera.applyGravity = true;
            followCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            followCamera.checkCollisions = true;

            cameraWrapper = BABYLON.Mesh.CreateBox("cameraWrapper", 2, scene);

            /*var freeCamera = createFreeCamera();
            scene.activeCamera = freeCamera;
            scene.collisionsEnabled = true;

            freeCamera.attachControl(canvas);
            freeCamera.applyGravity = true;
            freeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            freeCamera.checkCollisions = true;
            console.log("isCPressed: " + isCPressed);*/

            scene.registerBeforeRender(function () {
                cameraWrapper.position = followCamera.position;
                cameraWrapper.rotation = followCamera.rotation;
            });

            engine.runRenderLoop(function() {
                scene.render();
                if(tank) {
                    applyTankMovements();
                    checkRays(tank);
                    fire();
                    HUD();
                }
            });
        }
        else { setTimeout(function(){waitForIt()},300); }
    }

    function createFreeCamera() {
        var camera = new BABYLON.FreeCamera("c1",new BABYLON.Vector3(0, 10, 0), scene);
        camera.keysUp.push('i'.charCodeAt(0));
        camera.keysUp.push('I'.charCodeAt(0));
        camera.keysDown.push('k'.charCodeAt(0));
        camera.keysDown.push('K'.charCodeAt(0));
        camera.keysRight.push('l'.charCodeAt(0));
        camera.keysRight.push('L'.charCodeAt(0));
        camera.keysLeft.push('j'.charCodeAt(0));
        camera.keysLeft.push('J'.charCodeAt(0));
        camera.checkCollisions = true;
        return camera;
    }

    function createFollowCamera() {
        var camera = new BABYLON.FollowCamera("follow", new BABYLON.Vector3(0, 2, -20), scene);
        camera.lockedTarget = tank;
        camera.radius = 10; // how far from the object to follow
        camera.heightOffset = 2; // how high above the object to place the camera
        camera.rotationOffset = 0; // the viewing angle
        camera.cameraAcceleration = 0.05 // how fast to move
        camera.maxCameraSpeed = 20 // speed limit
        return camera;
    }

    function createLight(flag) {
        var hemisphericlight = new BABYLON.HemisphericLight("l1", new BABYLON.Vector3(0, 5, 0), scene);
        if(flag === 1) {
            hemisphericlight.intensity = .3;
        }
        return hemisphericlight;
    }

    function createGround() {
        var ground = new BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/myHeightMap.png", 500, 500, 20, 0, 10, scene, false, onGroundCreated);

        var groundMaterial = new BABYLON.StandardMaterial("m1", scene);
        //groundMaterial.diffuseColor = new BABYLON.Color3(.35, .30, .25);
        groundMaterial.diffuseTexture = new BABYLON.Texture("images/sand.jpg", scene);

        function onGroundCreated() {
            ground.material = groundMaterial;
            ground.checkCollisions = true;
        }
        isPickable = false;
        return ground;
    }

    function createSkybox() {
        var skybox = BABYLON.Mesh.CreateBox("skyBox", 500, scene);
        var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.disableLighting = true;
        skybox.material = skyboxMaterial;
        skybox.infiniteDistance = true;
        skyboxMaterial.disableLighting = true;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        isPickable = false;
        return skybox;
    }

    function createTank(assetName) {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", assetName, scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            tank = newMeshes[0];
            //tank.position.y += 20;
            tank.position = new BABYLON.Vector3(Math.floor((Math.random() * 100) + 1),0,Math.floor((Math.random() * 100) + 1));
            tank.checkCollisions = true;
            tank.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            tank.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            tank.applyGravity = true;
            tank.frontVector = new BABYLON.Vector3(0, 0, -1);
            tank.rotationSensitivity = .05;
            isTankReady = true;
            console.log("returning tank of type " + typeof tank + " and isTankReady = " + isTankReady);
            return tank;
        }
    }

    function createBustedTank() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "bustedTank.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            bustedTank = newMeshes[0];
            bustedTank.position.x = tank.position.x;
            bustedTank.position.z = tank.position.z;
            bustedTank.checkCollisions = true;
            bustedTank.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            bustedTank.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            bustedTank.applyGravity = true;
            return bustedTank;
        }
    }

    function createModel(modelName,materialName,modelColor,scaleX,scaleY,scaleZ,num) {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", modelName, scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            var model = [];
            model[0] = newMeshes[0];
            if(materialName) {
                var modelMaterial = new BABYLON.StandardMaterial(materialName, scene);
                modelMaterial.diffuseColor = modelColor;
                model[0].material = modelMaterial;
            }
            model[0].checkCollisions = true;
            model[0].ellipsoid = new BABYLON.Vector3(1, 1, 1);
            model[0].ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            model[0].applyGravity = true;
            if(modelName === "cow.babylon") {
                model[0].checkCollisions = false;
            }

            model = clone(model[0],num);
            for(var i=0;i<model.length;i++) {
                var scale = Math.random()*4.5+0.5;
                model[i].scaling.x*=(scaleX);
                model[i].scaling.y*=(scaleY);
                model[i].scaling.z*=(scaleZ);
            }
            for(var n=1;n<model.length;n++) {
                model[n].position.x += (Math.random() * (200 + 200) - 200);
                model[n].position.z += (Math.random() * (200 + 200) - 200);
            }
            return model;
        }
    }

    function clone(model,num){
        var clones = [];
        for(var i=0;i<num;i++)
            clones.push(model.clone("clone_" + i));
        return clones;
    }

    function applyTankMovements() {
        if (isWPressed) {
            tank.moveWithCollisions(tank.frontVector);
        }
        if (isSPressed) {
            var reverseVector = tank.frontVector.multiplyByFloats(-1, 1, -1);
            tank.moveWithCollisions(reverseVector);
        }
        if (isDPressed) {
            tank.rotation.y += .1 * tank.rotationSensitivity;
        }
        if (isAPressed)
            tank.rotation.y -= .1 * tank.rotationSensitivity;

        tank.frontVector.x = Math.sin(tank.rotation.y) * -0.1;
        tank.frontVector.z = Math.cos(tank.rotation.y) * -0.1;
        tank.frontVector.y = -4; // adding a bit of gravity
    }

    function fire() {
        if(isFPressed) {
            console.log("shooting balls");
            createBullet();
            if(bullet) {
                bullet.position = tank.position.add(BABYLON.Vector3.Zero().add(tank.frontVector.normalize().multiplyByFloats(20, 12, 20).negate()));
                bullet.position.y -= 10;
                //bullet.rotation.y += 24;
                bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 10, friction: 10, restitution: 0 }, scene);
                bullet.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero().add(tank.frontVector.normalize().multiplyByFloats(-500, 0, -500).negate()));
                setTimeout(function () { bullet.dispose(); }, 3000);
            }
            else {
                setTimeout(function () { fire(); }, 300);
            }
        }
    }

    function createBullet() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "bullet.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            bullet = newMeshes[0];
            bullet.position.x += 10;
            bullet.position.z -= 10;
            bullet.checkCollisions = true;
            bullet.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            bullet.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            bullet.applyGravity = true;
            return bullet;
        }
    }

    function checkRays(tank) {
        if(isRPressed) {
            var origin = tank.position;
            var direction = tank.frontVector;
            direction.y = 0;
            var ray = new BABYLON.Ray(origin, direction, 1000);
            var pickRes = scene.pickWithRay(ray);

            var rayHelper = new BABYLON.RayHelper(ray);
            rayHelper.show(scene,new BABYLON.Color3.Blue);

            if(pickRes) {
                if(isPickable) {
                    console.log(pickRes.pickedMesh.name);
                    return true;
                }
                else {
                    console.log("Not Pickable object: " + pickRes.pickedMesh.name);
                    return false;
                }
            }

        }
    }

    function clamp(num, min, max) {
        if(num >= max)
            return num = max;
        else if(num <= min)
            return num = min;
        else
            return num;
    }

    function HUD() {
        var boxButton = BABYLON.Mesh.CreatePlane("boxButton", 0.5, scene);
        boxButton.position = new BABYLON.Vector3(-2, -2, 6);
        boxButton.parent = cameraWrapper;

        if(health1 === 0) {
            console.log("Player 2 wins");
            bustedTank1 = createBustedTank();
        }
        /*if(health2 === 0) {
            console.log("Player 1 wins");
            bustedTank2 = createBustedTank();
        }*/
    }

}