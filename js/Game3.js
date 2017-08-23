var sceneNum = 0;

function Game() {
    document.getElementById("UICanvas").style.display = "none";
    document.getElementById("InstructionsCanvas").style.display = "none";
    document.getElementById("CreditsCanvas").style.display = "none";
    document.getElementById("MapsCanvas").style.display = "none";

    document.getElementById("renderCanvas").style.display = "inline";

    /*Variables*/
    var canvas;
    var engine;
    var scene;
    var light;
    var ground;

    var assetsManager;
    var shadowGenerator;
    var movementLimit = 0;

    var currentTank = 0;
    var followCamera;
    var turnTimer = 0;

    var tank = [];
    var bullet;
    var bustedTank;
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

    var bar;
    var health1;
    var health2;

    /*--------------------------------------------------------------------------------------------------------------------*/

    //Listeners
    document.addEventListener("keyup", function () {
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
        if (event.key == 'f' || event.key == 'F') {
            isFPressed = false;
            setTimeout(function () {
                switchTanks();
            }, 1500);
        }
        if (event.key == 'r' || event.key == 'R') {
            isRPressed = false;
        }
        //if(event.key == 'g' || event.key =='G')
        //  switchTanks();
    });
    document.addEventListener("keydown", function () {
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
        if (event.key == 'f' || event.key == 'F') {
            isFPressed = true;
        }
        if (event.key == 'r' || event.key == 'R') {
            isRPressed = true;
        }
    });

    /*GameStart*/
    createScene();
    HUD();

    /*Functions*/
    function createSandScene() {
        console.log("creating sand scene");
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
        scene = new BABYLON.Scene(engine);
        engine.isPointerLock = true;
        engine.enableOfflineSupport = false;
        scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.CannonJSPlugin());
        createAssetsManager();

        ground = createGround();
        light = createLight();
        var skybox = createSkybox();

        createTank("tank1.babylon", 2);
        //createTank("tank2.babylon",1);
        //bustedTank = createBustedTank();
        health1 = 100;
        health2 = 100;
        health1.parent = tank[0];
        health2.parent = tank[1];

        cactus = createModel("cactus.babylon", "cactusMaterial", new BABYLON.Color3(.3, .7, .2), .5, 1, .5, 10);
        radar = createModel("radar.babylon", null, null, 1, 1, 1, 2);
        cow = createModel("cow.babylon", null, null, 1, 1, 1, 20);
        helipad = createModel("helipad.babylon", null, null, 2, 1, 2, 3);
        oilStorage = createModel("oilStorage.babylon", null, null, 3, 1, 3, 2);
        palmTree = createModel("palmTree.babylon", null, null, 1.5, 1, 1.5, 10);
        tree = createModel("tree.babylon", null, null, 1.5, 1, 1.5, 10);
        rocks1 = createModel("rocks1.babylon", null, null, 1, 1, 1, 5);
        rocks2 = createModel("rocks2.babylon", null, null, 1, 1, 1, 5);
        barrel = createModel("barrel.babylon", null, null, 1, 1, 1, 10);

        waitForIt();
    }

    function createFogScene() {
        console.log("creating fog scene")
        canvas = document.getElementById("renderCanvas");
        engine = new BABYLON.Engine(canvas, true);
        scene = new BABYLON.Scene(engine);
        engine.isPointerLock = true;
        engine.enableOfflineSupport = false;
        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.01;
        scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.CannonJSPlugin());
        createAssetsManager();

        ground = createGround();
        light = createLight(1);
        var skybox = createSkybox();

        createTank("tank1.babylon", 2);
        //createTank("tank2.babylon",1);
        //bustedTank = createBustedTank();
        health1 = 100;
        health2 = 100;
        health1.parent = tank[0];
        health2.parent = tank[1];

        cactus = createModel("cactus.babylon", "cactusMaterial", new BABYLON.Color3(.3, .7, .2), .5, 1, .5, 10);
        radar = createModel("radar.babylon", null, null, 1, 1, 1, 2);
        cow = createModel("cow.babylon", null, null, 1, 1, 1, 20);
        helipad = createModel("helipad.babylon", null, null, 2, 1, 2, 3);
        oilStorage = createModel("oilStorage.babylon", null, null, 3, 1, 3, 2);
        palmTree = createModel("palmTree.babylon", null, null, 1.5, 1, 1.5, 10);
        tree = createModel("tree.babylon", null, null, 1.5, 1, 1.5, 10);
        rocks1 = createModel("rocks1.babylon", null, null, 1, 1, 1, 5);
        rocks2 = createModel("rocks2.babylon", null, null, 1, 1, 1, 5);
        barrel = createModel("barrel.babylon", null, null, 1, 1, 1, 10);

        waitForIt();
    }

    function createScene() {
        if (sceneNum === 0) {
            createSandScene();
        }
        else if (sceneNum === 1) {
            createFogScene();
        }
    }

    function createAssetsManager() {
        if (scene) {
            assetsManager = new BABYLON.AssetsManager(scene);
        }
        else {
            setTimeout(function () {
                createAssetsManager();
            }, 300);
        }
    }

    function loadAssetsManager() {
        if (assetsManager) {
            assetsManager.load();
        }
        else {
            setTimeout(function () {
            }, 300);
        }
    }

    function switchTanks() {
        if (currentTank === 0) {
            currentTank = 1;
            followCamera.lockedTarget = tank[1];
            movementLimit = 0;
            turnTimer = 0;
        }
        else if (currentTank === 1) {
            currentTank = 0;
            followCamera.lockedTarget = tank[0];
            movementLimit = 0;
            turnTimer = 0;
        }
    }

    function createShadow() {  //not used yet
        if (light && tank[0] && tank[1] && ground) {
            shadowGenerator = new BABYLON.ShadowGenerator(100, light);
            shadowGenerator.getShadowMap().renderList.push(tank[0]);
            shadowGenerator.getShadowMap().renderList.push(tank[1]);
            ground.receiveShadows = true;
        }
        else {
            setTimeout(function () {
                createShadow();
            }, 300);
        }
    }

    function waitForIt() {
        console.log("wait for it");
        loadAssetsManager();

        followCamera = createFollowCamera(currentTank);
        scene.activeCamera = followCamera;
        scene.collisionsEnabled = true;

        followCamera.attachControl(canvas);
        followCamera.applyGravity = true;
        followCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        followCamera.checkCollisions = true;

        /*var freeCamera = createFreeCamera();
        scene.activeCamera = freeCamera;
        scene.collisionsEnabled = true;

        freeCamera.attachControl(canvas);
        freeCamera.applyGravity = true;
        freeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        freeCamera.checkCollisions = true;*/

        assetsManager.onFinish = function (tasks) {
            engine.runRenderLoop(function () {
                scene.render();
                if (!followCamera.lockedTarget)
                    followCamera.lockedTarget = tank[currentTank];
                turnTimer++;
                if (turnTimer === 500)
                    switchTanks();
                if (movementLimit < 300)
                    applyTankMovements(currentTank);

                checkRays(tank[currentTank]);
                fire(currentTank);
            });
        };
    }

    function createFreeCamera(scene) {
        var camera = new BABYLON.FreeCamera("c1", new BABYLON.Vector3(0, 10, 0), scene);
        camera.keysUp.push('w'.charCodeAt(0));
        camera.keysUp.push('W'.charCodeAt(0));
        camera.keysDown.push('s'.charCodeAt(0));
        camera.keysDown.push('S'.charCodeAt(0));
        camera.keysRight.push('d'.charCodeAt(0));
        camera.keysRight.push('D'.charCodeAt(0));
        camera.keysLeft.push('a'.charCodeAt(0));
        camera.keysLeft.push('A'.charCodeAt(0));
        camera.checkCollisions = true;
        return camera;
    }

    function createLight(flag) {
        var hemisphericlight = new BABYLON.HemisphericLight("l1", new BABYLON.Vector3(0, 5, 0), scene);
        if (flag === 1) {
            hemisphericlight.intensity = .3;
        }
        return hemisphericlight;
    }

    function createGround() {
        var ground = new BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/myHeightMap.png", 500, 500, 20, 0, 10, scene, false, onGroundCreated);

        var groundMaterial = new BABYLON.StandardMaterial("m1", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("images/sand.jpg", scene);

        function onGroundCreated() {
            ground.material = groundMaterial;
            ground.checkCollisions = true;
        }

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
        var skyBoxTextureTask = assetsManager.addCubeTextureTask("skybox texture task", "images/skybox/skybox");
        skyBoxTextureTask.onSuccess = function (task) {
            skyboxMaterial.reflectionTexture = task.texture;
            skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        }
        return skybox;
    }

    function createFollowCamera(tankID) {
        var camera = new BABYLON.FollowCamera("follow", new BABYLON.Vector3(0, 2, -20), scene);
        camera.lockedTarget = tank[tankID];
        console.log(tankID);
        camera.radius = 10; // how far from the object to follow
        camera.heightOffset = 2; // how high above the object to place the camera
        camera.rotationOffset = 0; // the viewing angle
        camera.cameraAcceleration = 0.05 // how fast to move
        camera.maxCameraSpeed = 20 // speed limit
        return camera;
    }

    function createTank(assetName, num) {
        var tankTask = assetsManager.addMeshTask("tank task", "", "GameObjects/", assetName);
        tankTask.onSuccess = function (task) {
            console.log("createTank called");
            var newMeshes = task.loadedMeshes;
            tank[0] = newMeshes[0];
            //tank.position.y += 20;
            tank[0].position = new BABYLON.Vector3(Math.floor((Math.random() * 100) + 1), 0, Math.floor((Math.random() * 100) + 1));
            tank[0].checkCollisions = true;
            tank[0].ellipsoid = new BABYLON.Vector3(1, 1, 1);
            tank[0].ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            tank[0].applyGravity = true;
            tank[0].frontVector = new BABYLON.Vector3(0, 0, -1);
            tank[0].rotationSensitivity = .05;

            tank = clone(tank[0], num);

            setTimeout(function () {
                for (var i = 0; i < tank.length; i++) {
                    var boundingBox = calculateAndMakeBoundingBoxOfCompositeMeshes(newMeshes, scene);
                    tank[i].bounder = boundingBox.boxMesh;
                    tank[i].bounder.tank = tank[i];
                    tank[i].bounder.ellipsoidOffset.y += 3; // if I make this += 10 , no collision happens (better performance), but they merge
                    // if I make it +=2 , they are visually good, but very bad performance (actually bad performance when I console.log in the onCollide)
                    // if I make it += 1 , very very bad performance as it is constantly in collision with the ground
                    tank[i].position = tank[i].bounder.position;
                    tank[i].bounder.onCollide = function (mesh) {
                        if (mesh.name == "ground") {
                            console.log("koko");
                        }
                    }
                }
            }, 300);

            isTankReady = true;
            console.log("returning tank of type " + typeof tank[0] + " and isTankReady = " + isTankReady);
        }
    }

    function applyTankMovements(tankID) {
        if (isWPressed) {
            tank[tankID].moveWithCollisions(tank[tankID].frontVector);
            movementLimit++;
        }
        if (isSPressed) {
            var reverseVector = tank[tankID].frontVector.multiplyByFloats(-1, 1, -1);
            tank[tankID].moveWithCollisions(reverseVector);
            movementLimit++;
        }
        if (isDPressed) {
            tank[tankID].rotation.y += .1 * tank[tankID].rotationSensitivity;
            tank[tankID].bounder.rotation.y += .1 * tank[tankID].rotationSensitivity;
        }
        if (isAPressed) {
            tank[tankID].rotation.y -= .1 * tank[tankID].rotationSensitivity;
            tank[tankID].bounder.rotation.y -= .1 * tank[tankID].rotationSensitivity;
        }
        tank[tankID].frontVector.x = Math.sin(tank[tankID].rotation.y) * -0.1;
        tank[tankID].frontVector.z = Math.cos(tank[tankID].rotation.y) * -0.1;
        tank[tankID].frontVector.y = -4; // adding a bit of gravity
    }

    function createModel(modelName, materialName, modelColor, x, y, z, num) {
        var modelTask = assetsManager.addMeshTask("model task", "", "GameObjects/", modelName);
        modelTask.onSuccess = function (task) {
            console.log("createModel called");
            var newMeshes = task.loadedMeshes;
            var model = [];
            model[0] = newMeshes[0];
            if (materialName) {
                var modelMaterial = new BABYLON.StandardMaterial(materialName, scene);
                modelMaterial.diffuseColor = modelColor;
                model[0].material = modelMaterial;
            }
            model[0].checkCollisions = true;
            model[0].ellipsoid = new BABYLON.Vector3(1, 1, 1);
            model[0].ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            model[0].applyGravity = true;

            if (modelName === "cow.babylon") {
                model[0].checkCollisions = false;
            }

            model = clone(model[0], num);
            console.log(model.length);
            for (var i = 0; i < model.length; i++) {
                var scale = Math.random() * 4.5 + 0.5;
                model[i].scaling.x *= (x);
                model[i].scaling.y *= (y);
                model[i].scaling.z *= (z);
            }
            for (var i = 0; i < model.length; i++) {
                model[i].position.x += (Math.random() * (200 + 200) - 200);
                model[i].position.z += (Math.random() * (200 + 200) - 200);

            }
            return model;
        }
    }

    function clone(model, num) {
        var clones = [];
        clones.push(model);
        for (var i = 1; i < num; i++)
            clones.push(model.clone("clone_" + i));
        return clones;
    }

    function calculateAndMakeBoundingBoxOfCompositeMeshes(newMeshes, scene) {
        var minx = 10000;
        var miny = 10000;
        var minz = 10000;
        var maxx = -10000;
        var maxy = -10000;
        var maxz = -10000;

        for (var i = 0; i < newMeshes.length; i++) {
            var positions = new BABYLON.VertexData.ExtractFromGeometry(newMeshes[i]).positions;
            // newMeshes[i].checkCollisions = true;
            if (!positions) continue;
            var index = 0;

            for (var j = index; j < positions.length; j += 3) {
                if (positions[j] < minx)
                    minx = positions[j];
                if (positions[j] > maxx)
                    maxx = positions[j];
            }
            index = 1;

            for (var j = index; j < positions.length; j += 3) {
                if (positions[j] < miny)
                    miny = positions[j];
                if (positions[j] > maxy)
                    maxy = positions[j];
            }
            index = 2;
            for (var j = index; j < positions.length; j += 3) {
                if (positions[j] < minz)
                    minz = positions[j];
                if (positions[j] > maxz)
                    maxz = positions[j];
            }
        }

        var _lengthX = (minx * maxx > 1) ? Math.abs(maxx - minx) : Math.abs(minx * -1 + maxx);
        var _lengthY = (miny * maxy > 1) ? Math.abs(maxy - miny) : Math.abs(miny * -1 + maxy);
        var _lengthZ = (minz * maxz > 1) ? Math.abs(maxz - minz) : Math.abs(minz * -1 + maxz);
        var _center = new BABYLON.Vector3((minx + maxx) / 2.0, (miny + maxy) / 2.0, (minz + maxz) / 2.0);

        var _boxMesh = BABYLON.Mesh.CreateBox("tankbox", 1, scene);
        _boxMesh.scaling.x = _lengthX / 85;
        _boxMesh.scaling.y = _lengthY / 59;
        _boxMesh.scaling.z = _lengthZ / 99;
        //_boxMesh.position = newMeshes[0].position;
        //_boxMesh.position.y += .5; // if I increase this, the dude gets higher in the skyyyyy
        _boxMesh.checkCollisions = true;
        _boxMesh.material = new BABYLON.StandardMaterial("alpha", scene);
        _boxMesh.material.alpha = 0.5;
        _boxMesh.isVisible = true;
        _boxMesh.position = new BABYLON.Vector3(Math.floor((Math.random() * 100) + 1), 0, Math.floor((Math.random() * 100) + 1));

        return {
            min: {x: minx, y: miny, z: minz},
            max: {x: maxx, y: maxy, z: maxz},
            lengthX: _lengthX,
            lengthY: _lengthY,
            lengthZ: _lengthZ,
            center: _center,
            boxMesh: _boxMesh
        };
    }

    function fire(tankID) {
        if (isFPressed) {
            console.log("shooting balls");
            createBullet();

            if (bullet) {
                bullet.position = tank[tankID].position.add(BABYLON.Vector3.Zero().add(tank[tankID].frontVector.normalize().multiplyByFloats(20, 12, 20).negate()));
                bullet.position.y -= 10;
                //bullet.rotation.y += 24;
                bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.BoxImpostor, {
                    mass: 10,
                    friction: 10,
                    restitution: 0
                }, scene);
                bullet.physicsImpostor.setLinearVelocity(BABYLON.Vector3.Zero().add(tank[tankID].frontVector.normalize().multiplyByFloats(-500, 0, -500).negate()));
                setTimeout(function () {
                    bullet.dispose();
                }, 3000);
            }
            else {
                setTimeout(function () {
                    fire();
                }, 300);
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
        if (isRPressed) {
            var origin = tank.position;
            var direction = tank.frontVector;
            direction.y = 0;
            var ray = new BABYLON.Ray(origin, direction, 1000);
            var pickRes = scene.pickWithRay(ray);

            var rayHelper = new BABYLON.RayHelper(ray);
            rayHelper.show(scene, new BABYLON.Color3.Blue);

            if (pickRes) {
                if (isPickable) {
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

    function HUD() {
        /*NAMES*/
        document.getElementById("player1").style.display = "inline";
        document.getElementById("player2").style.display = "inline";

        /*BARS*/
        var container1 = document.getElementsByClassName("container1");
        container1[0].style.display = "block";
        var bar1 = document.getElementsByClassName("bar1");
        bar1[0].style.display = "block";
        var bar_fill1 = document.getElementsByClassName("bar-fill1");
        bar_fill1[0].style.display = "block";

        var container2 = document.getElementsByClassName("container2");
        container2[0].style.display = "block";
        var bar2 = document.getElementsByClassName("bar2");
        bar2[0].style.display = "block";
        var bar_fill2 = document.getElementsByClassName("bar-fill2");
        bar_fill2[0].style.display = "block";

        /*ADS*/
        document.getElementById("slider").style.display = "block";

        /*TIMER*/
        document.getElementById("timerContainer").style.display = "block";
        var timer = document.getElementById("timer");
        var sec = 180;
        var countTime = setInterval(function() {
            sec--;
            timer.innerHTML = sec;
            if(sec < 0) {
                timer.innerHTML = "GameOver!";
                clearInterval(countTime);
            }
        }, 1000);
    }
}








