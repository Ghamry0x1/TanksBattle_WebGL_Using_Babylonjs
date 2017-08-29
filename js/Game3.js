var sceneNum = 0;
var gameOver = 0;
var currentTank = 0;
var alive = [];

function Game() {
    /*Variables*/
    var canvas;
    var engine;
    var scene;
    var light;
    var ground;

    var followCamera;
    var assetsManager;
    var shadowGenerator;
    var cameraLocked = true;

    var tankNames = [];
    var tank = [];
    var turnTimer = 15;
    var movementLimit = 150;

    var dontMove = false;
    var delayRayShot=false;
    var textPlaneTexture = [];
    var tanksPositions = [];
    var frontHealthBar = [];
    var backHealthBar = [];
    var dynamicTexture = [];
    var healthBarMaterial = [];
    var healthBarContainerMaterial = [];
    var healthBarContainer = [];
    var healthPercentage = [];
    var healthBarReady = false;

    var bullet;
    var bustedTank = [];
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

/*--------------------------------------------------------------------------------------------------------------------*/

    /*Listeners*/
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
        if (event.key == 'q' || event.key == 'Q') {
            updateHealthBar();
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
            checkRays();
            isRPressed = true;
        }

    });

    /*GameStart*/
    for(var i=0;i<n;i++){
        tankNames.push("tank"+(i+1)+".babylon");
    }
    createScene();
    HUD();

    /*Functions*/
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
            setupTanksPositions();
        }
        else {
            setTimeout(function () {
            }, 300);
        }
    }


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
        for(var i=0;i<n;i++) {
            createTank(tankNames[i], i);
        }

        cactus = createModel("cactus.babylon", "cactusMaterial", new BABYLON.Color3(.3, .7, .2), .5, 1, .5, 18);
        radar = createModel("radar.babylon", null, null, 1, 1, 1, 5);
        cow = createModel("cow.babylon", null, null, 1, 1, 1, 25);
        helipad = createModel("helipad.babylon", null, null, 2, 1, 2, 3);
        oilStorage = createModel("oilStorage.babylon", null, null, 3, 1, 3, 2);
        palmTree = createModel("palmTree.babylon", null, null, 1.5, 1, 1.5, 15);
        tree = createModel("tree.babylon", null, null, 1.5, 1, 1.5, 15);
        rocks1 = createModel("rocks1.babylon", null, null, 1, 1, 1, 7);
        rocks2 = createModel("rocks2.babylon", null, null, 1, 1, 1, 7);
        barrel = createModel("barrel.babylon", null, null, 1, 1, 1, 16);

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

        for(var i=0;i<n;i++) {
            createTank(tankNames[i], i);
        }

        cactus = createModel("cactus.babylon", "cactusMaterial", new BABYLON.Color3(.3, .7, .2), .5, 1, .5, 10);
        radar = createModel("radar.babylon", null, null, 1, 1, 1, 2);
        cow = createModel("cow.babylon", null, null, 1, 1, 1, 20);
        helipad = createModel("helipad.babylon", null, null, 2, 1, 2, 1);
        oilStorage = createModel("oilStorage.babylon", null, null, 3, 1, 3, 2);
        palmTree = createModel("palmTree.babylon", null, null, 1.5, 1, 1.5, 50);
        tree = createModel("tree.babylon", null, null, 1.5, 1, 1.5, 100);
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

    function waitForIt() {
        console.log("wait for it");
        loadAssetsManager();
        //try loading page here

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
                if(gameOver == 0) {
                    scene.render();
                    if (!followCamera.lockedTarget&&cameraLocked) {
                        cameraLocked=false;
                        followCamera.lockedTarget = tank[currentTank];
                    }

                    if (movementLimit <= 0)
                        dontMove=true;

                    applyTankMovements();
                    //fire(currentTank);
                }
                else {
                    //reset();
                    GameOver();
                }
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

    function createFollowCamera(tankID) {
        var camera = new BABYLON.FollowCamera("follow", new BABYLON.Vector3(0, 2, -20), scene);
        camera.lockedTarget = tank[tankID];
        console.log(tankID);
        camera.radius = 10; // how far from the object to follow
        camera.heightOffset = 2; // how high above the object to place the camera
        camera.rotationOffset = 0; // the viewing angle
        camera.cameraAcceleration = 0.015 // how fast to move
        camera.maxCameraSpeed = 20 // speed limit
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


    function createTank(assetName,i) {
        var tankTask = assetsManager.addMeshTask("tank task", "", "GameObjects/", assetName);
        tankTask.onSuccess = function (task) {
            var _tank;
            console.log("createTank called");
            var newMeshes = task.loadedMeshes;
            _tank = newMeshes[0];
            _tank.position = new BABYLON.Vector3(Math.floor((Math.random() * 100) + 1), 0, Math.floor((Math.random() * 100) + 1));
            _tank.checkCollisions = true;
            _tank.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            _tank.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            _tank.applyGravity = true;
            _tank.frontVector = new BABYLON.Vector3(0, 0, -1);
            _tank.rotationSensitivity = .05;
            for(var j=0;j<_tank._children.length;j++){
                _tank._children[j].name+="_"+i;
            }
            tank.push(_tank);

            var boundingBox = calculateAndMakeBoundingBoxOfCompositeMeshes(newMeshes, scene,i);
            _tank.bounder = boundingBox.boxMesh;
            _tank.bounder.tank = _tank;
            _tank.bounder.ellipsoidOffset.y += 3; // if I make this += 10 , no collision happens (better performance), but they merge
            // if I make it +=2 , they are visually good, but very bad performance (actually bad performance when I console.log in the onCollide)
            // if I make it += 1 , very very bad performance as it is constantly in collision with the ground
            _tank.position = _tank.bounder.position;
            _tank.bounder.onCollide = function (mesh) {
                if (mesh.name == "ground") {
                    console.log("koko");
                }
            }
            isTankReady = true;
        }
    }

    function setupTanksPositions(){
        tanksPositions.push(new BABYLON.Vector3(125,0,0));
        tanksPositions.push(new BABYLON.Vector3(-125,0,0));
        tanksPositions.push(new BABYLON.Vector3(0,0,125));
        tanksPositions.push(new BABYLON.Vector3(0,0,-125));
        tanksPositions.push(new BABYLON.Vector3(125,0,125));
        tanksPositions.push(new BABYLON.Vector3(125,0,-125));
        tanksPositions.push(new BABYLON.Vector3(-125,0,125));
        tanksPositions.push(new BABYLON.Vector3(-125,0,-125));
    }

    function createPlayerName() {
        for(var i = 0; i<tank.length; i++) {
            textPlaneTexture.push(new BABYLON.DynamicTexture("dynamic texture", 2048, scene, true));
            textPlaneTexture[i].drawText("PLAYER " + (i+1), null, 500, "bold 420px Comic Sans MS", "white", "transparent");
            textPlaneTexture[i].hasAlpha = true;

            tank[i].textPlane = BABYLON.Mesh.CreatePlane("textPlane", 1, scene, false);
            tank[i].textPlane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
            tank[i].textPlane.material = new BABYLON.StandardMaterial("textPlane", scene);
            tank[i].textPlane.parent = tank[i].bounder;
            tank[i].textPlane.position.y += 0.55;
            tank[i].textPlane.material.diffuseTexture = textPlaneTexture[i];
            tank[i].textPlane.material.specularColor = new BABYLON.Color3(0,0,0);
            tank[i].textPlane.material.emissiveColor = new BABYLON.Color3(1,1,1);
            tank[i].textPlane.material.backFaceCulling = false;
        }
    }

    function createHealthBar(){
        console.log("tank length is "+tank.length);
        if(tank.length===n) {
            for (var i = 0; i < tank.length; i++) {
                healthBarMaterial.push(new BABYLON.StandardMaterial("hb1mat", scene));
                healthBarMaterial[i].diffuseColor = BABYLON.Color3.Green();
                healthBarMaterial[i].backFaceCulling = false;

                healthBarContainerMaterial.push(new BABYLON.StandardMaterial("hb2mat", scene));
                healthBarContainerMaterial[i].diffuseColor = BABYLON.Color3.Red();
                healthBarContainerMaterial[i].backFaceCulling = false;

                dynamicTexture.push(new BABYLON.DynamicTexture("dt1", 512, scene, true));
                dynamicTexture[i].hasAlpha = true;


                frontHealthBar.push(BABYLON.MeshBuilder.CreatePlane("hb1", {width: .7, height: .04, subdivisions: 4}, scene));
                healthBarContainer.push(BABYLON.MeshBuilder.CreatePlane("hb2", {width: .7,height: .04,subdivisions: 4}, scene));
                frontHealthBar[i].position = new BABYLON.Vector3(0, 0, -.01);			// Move in front of container slightly.  Without this there is flickering.
                healthBarContainer[i].position = new BABYLON.Vector3(0, 0.55, 0);     // Position above player.
                frontHealthBar[i].parent = healthBarContainer[i];
                healthBarContainer[i].parent = tank[i].bounder;
                frontHealthBar[i].material = healthBarMaterial[i];
                healthBarContainer[i].material = healthBarContainerMaterial[i];

                backHealthBar.push(BABYLON.MeshBuilder.CreatePlane("hb1", {width: .7, height: .04, subdivisions: 4}, scene));
                healthBarContainer.push(BABYLON.MeshBuilder.CreatePlane("hb2", {width: .7,height: .04,subdivisions: 4}, scene));
                backHealthBar[i].position = new BABYLON.Vector3(0, 0, .01);			// Move in front of container slightly.  Without this there is flickering.
                backHealthBar[i].parent = healthBarContainer[i];
                backHealthBar[i].material = healthBarMaterial[i];
                alive.push(true);
                healthPercentage.push(100);
            }
            createPlayerName();
            healthBarReady=true;
        }
        else{setTimeout(function () {
            createHealthBar();
        }, 300);}
    }

    function updateHealthBar(tankID){
        console.log(healthPercentage[tankID]);
        if(healthBarReady) {
            console.log(alive[tankID]);
            if (alive[tankID]) {
                if(frontHealthBar[tankID].scaling.x>0){
                    frontHealthBar[tankID].scaling.x = healthPercentage[tankID] / 100;
                    backHealthBar[tankID].scaling.x = healthPercentage[tankID] / 100;
                    frontHealthBar[tankID].position.x =  (1- (healthPercentage[tankID] / 100)) * -0.35;
                    backHealthBar[tankID].position.x =  (1- (healthPercentage[tankID] / 100)) * -0.35;
                    healthPercentage[tankID] -= 20;
                }
                if (frontHealthBar[tankID].scaling.x <= 0) {
                    alive[tankID] = false;
                }
                else if (frontHealthBar[tankID].scaling.x < .5) {
                    healthBarMaterial[tankID].diffuseColor = BABYLON.Color3.Yellow();
                }
            }
            else if (!(alive[tankID])){
                createBustedTank(tankID);
                createFire(tankID);
                //tank[tankID].bounder.dispose();
                tank[tankID].dispose();
                healthBarContainer[tankID].dispose();
                healthBarMaterial[tankID].dispose();
                //textPlaneTexture[tankID].dispose();
            }
        }
        else{setTimeout(function () {
            updateHealthBar();
        }, 300);}
    }

    function applyTankMovements() {
        if (isWPressed && !dontMove) {
            tank[currentTank].moveWithCollisions(tank[currentTank].frontVector);
            //movementLimit++;
        }
        if (isSPressed&&!dontMove) {
            var reverseVector = tank[currentTank].frontVector.multiplyByFloats(-1, 1, -1);
            tank[currentTank].moveWithCollisions(reverseVector);
            //  movementLimit++;
        }
        if (isDPressed) {
            tank[currentTank].rotation.y += .1 * tank[currentTank].rotationSensitivity;
            tank[currentTank].bounder.rotation.y += .1 * tank[currentTank].rotationSensitivity;
        }
        if (isAPressed) {
            tank[currentTank].rotation.y -= .1 * tank[currentTank].rotationSensitivity;
            tank[currentTank].bounder.rotation.y -= .1 * tank[currentTank].rotationSensitivity;
        }
        tank[currentTank].frontVector.x = Math.sin(tank[currentTank].rotation.y) * -0.5;
        tank[currentTank].frontVector.z = Math.cos(tank[currentTank].rotation.y) * -0.5;
        tank[currentTank].frontVector.y = -4; // adding a bit of gravity
    }

    function switchTanks() {
        if (currentTank === tank.length - 1) {
            currentTank = 0;
            if(alive[currentTank]) {
                followCamera.lockedTarget = tank[currentTank];
                movementLimit = 150;
                turnTimer = 15;
                dontMove = false;
                for(var i=0;i<tank.length;i++)
                    tank[i].bounder.isPickable = true;
                tank[currentTank].bounder.isPickable = false;
            }
            else switchTanks();
        }
        else {
            currentTank++;
            if(alive[currentTank]) {
                followCamera.lockedTarget = tank[currentTank];
                movementLimit = 150;
                turnTimer = 15;
                dontMove = false;
                for(var i=0;i<tank.length;i++)
                    tank[i].bounder.isPickable = true;
                tank[currentTank].bounder.isPickable = false;
            }
            else switchTanks();
        }
    }

    function createBustedTank(tankID) {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "bustedTank.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            bustedTank[tankID]=newMeshes[0];
            bustedTank[tankID].position = tank[tankID].position;
            bustedTank[tankID].checkCollisions = true;
            bustedTank[tankID].ellipsoid = new BABYLON.Vector3(1, 1, 1);
            bustedTank[tankID].ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            bustedTank[tankID].applyGravity = true;
        }
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

    function calculateAndMakeBoundingBoxOfCompositeMeshes(newMeshes, scene,tankID) {
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

        var _boxMesh = BABYLON.Mesh.CreateBox("tankBounder_"+tankID, 1, scene);
        _boxMesh.scaling.x = _lengthX / 85;
        _boxMesh.scaling.y = _lengthY / 59;
        _boxMesh.scaling.z = _lengthZ / 99;
        //_boxMesh.position = newMeshes[0].position;
        //_boxMesh.position.y += .5; // if I increase this, the dude gets higher in the sky
        _boxMesh.checkCollisions = true;
        _boxMesh.material = new BABYLON.StandardMaterial("alpha", scene);
        _boxMesh.material.alpha = 0;
        _boxMesh.isVisible = true;
        // _boxMesh.position = new BABYLON.Vector3(Math.floor((Math.random() * 100) + 1), 0, Math.floor((Math.random() * 100) + 1));
        _boxMesh.position = tanksPositions[tankID];
        if(tankID===0)
            _boxMesh.isPickable=false;
        else
            _boxMesh.isPickable=true;
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
    /*function fire(tankID) {
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
    }*/
    function checkRays() {
        if (!delayRayShot) {
            delayRayShot = true;
            setTimeout(function () {
                delayRayShot = false;
            },800)
            var origin = tank[currentTank].position;
            var direction = tank[currentTank].frontVector;
            direction.y = 0;
            var ray = new BABYLON.Ray(origin, direction, 1000);
            //var pickRes = scene.pickWithRay(ray);
            var rayHelper = new BABYLON.RayHelper(ray);
            rayHelper.show(scene, new BABYLON.Color3.Blue);
            setTimeout(function () {
                rayHelper.hide();
            }, 500);
            var hit = scene.pickWithRay(ray);
            if(hit.pickedMesh) {
                console.log("mesh name is " + hit.pickedMesh.name);
                if (hit.pickedMesh.name.startsWith("tankBounder_")||hit.pickedMesh.name.startsWith("TankTracksRight_")||hit.pickedMesh.name.startsWith("TankTracksLeft_")) {
                    var tankID = parseInt(hit.pickedMesh.name[hit.pickedMesh.name.length - 1]);
                    //if(alive[tankID])
                        updateHealthBar(tankID);
                    //else destroyTank(tankID);
                }
            }
        }
    }
    /*function checkRays(tank) {
        if (isRPressed) {
            var origin = tank.position;
            var direction = tank.frontVector;
            direction.y = 0;
            var ray = new BABYLON.Ray(origin, direction, 1000);
            //var pickRes = scene.pickWithRay(ray);

            var rayHelper = new BABYLON.RayHelper(ray);
            rayHelper.show(scene, new BABYLON.Color3.Blue);
        }
    }*/
    function createFire(tankID){
        if(bustedTank[tankID]) {
            //Smoke
            var smokeSystem = new BABYLON.ParticleSystem("particles", 1000, scene);
            smokeSystem.particleTexture = new BABYLON.Texture("images/flare.png", scene);
            smokeSystem.emitter = ground; // the starting object, the emitter
            smokeSystem.minEmitBox = new BABYLON.Vector3(bustedTank[tankID].position.x-1, bustedTank[tankID].position.y-2, bustedTank[tankID].position.z); // Starting all from
            smokeSystem.maxEmitBox = new BABYLON.Vector3(bustedTank[tankID].position.x+1, bustedTank[tankID].position.y-2, bustedTank[tankID].position.z+1); // To...
            //smokeSystem.minEmitBox =  bustedTank[tankID].position;
            //smokeSystem.maxEmitBox = bustedTank[tankID].position;
            smokeSystem.position=bustedTank[tankID].position;
            smokeSystem.color1 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
            smokeSystem.color2 = new BABYLON.Color4(0.1, 0.1, 0.1, 1.0);
            smokeSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

            smokeSystem.minSize = 0.03;
            smokeSystem.maxSize = 2;

            smokeSystem.minLifeTime = 0.3;
            smokeSystem.maxLifeTime = 1.5;

            smokeSystem.emitRate = 2000;

            // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
            smokeSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

            smokeSystem.gravity = new BABYLON.Vector3(0, 0, 0);

            smokeSystem.direction1 = new BABYLON.Vector3(-1.5, 8, -1.5);
            smokeSystem.direction2 = new BABYLON.Vector3(1.5, 8, 1.5);

            smokeSystem.minAngularSpeed = 0;
            smokeSystem.maxAngularSpeed = Math.PI;

            smokeSystem.minEmitPower = 0.5;
            smokeSystem.maxEmitPower = 1.5;
            smokeSystem.updateSpeed = 0.01;

            smokeSystem.start();



            // Create a particle system
            var fireSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

            //Texture of each particle
            fireSystem.particleTexture = new BABYLON.Texture("images/flare.png", scene);

            // Where the particles come from
            fireSystem.emitter = ground; // the starting object, the emitter
            fireSystem.minEmitBox = new BABYLON.Vector3(bustedTank[tankID].position.x-1, bustedTank[tankID].position.y-2, bustedTank[tankID].position.z); // Starting all from
            fireSystem.maxEmitBox = new BABYLON.Vector3(bustedTank[tankID].position.x+1, bustedTank[tankID].position.y-2, bustedTank[tankID].position.z+1); // To...
            //fireSystem.minEmitBox =  bustedTank[tankID].position;
            //fireSystem.maxEmitBox = bustedTank[tankID].position;
            // Colors of all particles
            fireSystem.color1 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            fireSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
            fireSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);

            // Size of each particle (random between...
            fireSystem.minSize = 0.3;
            fireSystem.maxSize = 2;

            // Life time of each particle (random between...
            fireSystem.minLifeTime = 0.2;
            fireSystem.maxLifeTime = 0.4;

            // Emission rate
            fireSystem.emitRate = 5000;

            // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
            fireSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

            // Set the gravity of all particles
            fireSystem.gravity = new BABYLON.Vector3(0, 0, 0);

            // Direction of each particle after it has been emitted
            fireSystem.direction1 = new BABYLON.Vector3(0, 4, 0);
            fireSystem.direction2 = new BABYLON.Vector3(0, 4, 0);

            // Angular speed, in radians
            fireSystem.minAngularSpeed = 0;
            fireSystem.maxAngularSpeed = Math.PI;

            // Speed
            fireSystem.minEmitPower = 1;
            fireSystem.maxEmitPower = 3;
            fireSystem.updateSpeed = 0.01;

            // Start the particle system
            fireSystem.start();
            setTimeout(function () {
                fireSystem.stop();
                smokeSystem.stop();
            }, 5000);
        }
        else{
            setTimeout(function () {
                createFire(tankID);
            }, 500);
        }
    }

    function HUD() {
        /*PLAYER_NAME_AND_HEALTH_BAR*/
        createHealthBar();

        /*ADS*/
        document.getElementById("slider").style.display = "block";

        /*GAME_TIMER*/
        document.getElementById("timerContainer").style.display = "block";
        var timer = document.getElementById("timer");
        var sec = 180;
        var countTime = setInterval(function() {
            sec--;
            timer.innerHTML = "Game ends in " + sec + "s";
            if(sec < 0) {
                timer.innerHTML = "GameOver!";
                gameOver = 1;
                clearInterval(countTime);
            }
        }, 1000);

        /*PLAYER_INFO*/
        document.getElementById("PlayerContainer").style.display = "block";
        var PlayerTime = document.getElementById("PlayerTime");
        var PlayerDistance = document.getElementById("PlayerDistance");
        var countTime2 = setInterval(function() {
            turnTimer--;
            if((isWPressed||isSPressed)&&movementLimit>0)
                movementLimit-=15;
            PlayerTime.innerHTML = "Player " + (currentTank+1) + " time  left: " + turnTimer + "s";
            PlayerDistance.innerHTML = "Player " + (currentTank+1) + " distance left: " + movementLimit + "m";
            if(turnTimer <= 0) {
                switchTanks();
                countTime2;
            }
            if(sec<=0) {
                PlayerTime.innerHTML = "Player " + (currentTank+1) + " time  left: " + 0 + "s";
                PlayerDistance.innerHTML = "Player " + (currentTank+1) + " distance left: " + 0 + "m";
                clearInterval(countTime2);
            }
        }, 1000);
    }

    function reset() {
        gameOver = 0;
        /*for(var x=0; x<n; x++) {
            tank.pop();
        }
        console.log(tank.length);*/

        //3ayez arga3 kol haga zy fel awel khales
        // el arrays tefda kolaha ytshal el feha (tanks, tankNames, tanksPositions, alive, ...)
        //w ay variable mohem hyfre2 ka flag w etghyar yerga3 zy ma kan, zy gameOver wkeda
    }
}