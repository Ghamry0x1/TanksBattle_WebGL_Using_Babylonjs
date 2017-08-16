<<<<<<< HEAD
﻿var sceneNum = 0;
function Game() {
    var canvas;
    var engine;
    var scene;

    var tank;
    var bullet;
    var bustedTank;
    var cactus;
    var radar;
    var cow;
    var helipad;
    var oilStorage;
    var palmTree;
    var tree;
    var rocks1;
    var rocks2;
    var barrel;

    var isWPressed = false;
    var isAPressed = false;
    var isSPressed = false;
    var isDPressed = false;

    var isFPressed = false;
    var isRPressed = false;

    var isPickable = true;
    var isTankReady = false;

    const NEG_Z_VECTOR = new BABYLON.Vector3(0, 0, -1);
    const GRAVITY_VECTOR = new BABYLON.Vector3(0, 0, 0);
||||||| merged common ancestors
﻿document.addEventListener("DOMContentLoaded", startGame, false);

var canvas;
var engine;
var scene;
var sceneNum = 0;

var tank;
var bustedTank;
var cactus;
var radar;
var cow;
var helipad;
var oilStorage;
var palmTree;
var tree;
var rocks1;
var rocks2;
var barrel;

var isWPressed = false;
var isAPressed = false;
var isSPressed = false;
var isDPressed = false;
var isFPressed = false;

var isTankReady = false;

const NEG_Z_VECTOR = new BABYLON.Vector3(0, 0, -1);
const GRAVITY_VECTOR = new BABYLON.Vector3(0, 0, 0);

function startGame() {
    createScene();
    Listeners();
}

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
    cactus = createCactus();
    radar = createRadar();
    cow = createCow();
    bustedTank = createBustedTank();
    helipad = createHelipad();
    oilStorage = createOilStorage();
    palmTree = createPalmTree();
    tree = createTree();
    rocks1 = createRocks1();
    rocks2 = createRocks2();
    barrel = createBarrel();

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
    cactus = createCactus();
    radar = createRadar();
    cow = createCow();
    bustedTank = createBustedTank();
    helipad = createHelipad();
    oilStorage = createOilStorage();
    palmTree = createPalmTree();
    tree = createTree();
    rocks1 = createRocks1();
    rocks2 = createRocks2();
    barrel = createBarrel();

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

        /*var freeCamera = createFreeCamera();
        scene.activeCamera = freeCamera;
        scene.collisionsEnabled = true;

        freeCamera.attachControl(canvas);
        freeCamera.applyGravity = true;
        freeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        freeCamera.checkCollisions = true;*/

        engine.runRenderLoop(function() {
            scene.render();
            if(tank) {
                applyTankMovements();
                fire();
            }
        });
    }
    else { setTimeout(function(){waitForIt()},300); }
}

function createFreeCamera(scene) {
    var camera = new BABYLON.FreeCamera("c1",new BABYLON.Vector3(0, 10, 0), scene);
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
    if(flag === 1) {
        hemisphericlight.intensity = .3;
    }
    return hemisphericlight;
}

function createGround() {
    var ground = new BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/myHeightMap.png", 500, 500, 20, 0, 10, scene, false, onGroundCreated);
=======
﻿document.addEventListener("DOMContentLoaded", startGame, false);

var canvas;
var engine;
var scene;
var sceneNum = 0;

var tank;
var tank2;
var bustedTank;
var cactus;
var radar;
var cow;
var helipad;
var oilStorage;
var palmTree;
var tree;
var rocks1;
var rocks2;
var barrel;

var isWPressed = false;
var isAPressed = false;
var isSPressed = false;
var isDPressed = false;
var isFPressed = false;

var isTankReady = false;

const NEG_Z_VECTOR = new BABYLON.Vector3(0, 0, -1);
const GRAVITY_VECTOR = new BABYLON.Vector3(0, 0, 0);

function startGame() {
    createScene();
    Listeners();
}

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
    tank2 = createTank("tank2.babylon");
    cactus = createCactus();
    radar = createRadar();
    cow = createCow();
    bustedTank = createBustedTank();
    helipad = createHelipad();
    oilStorage = createOilStorage();
    palmTree = createPalmTree();
    tree = createTree();
    rocks1 = createRocks1();
    rocks2 = createRocks2();
    barrel = createBarrel();

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
    cactus = createCactus();
    radar = createRadar();
    cow = createCow();
    bustedTank = createBustedTank();
    helipad = createHelipad();
    oilStorage = createOilStorage();
    palmTree = createPalmTree();
    tree = createTree();
    rocks1 = createRocks1();
    rocks2 = createRocks2();
    barrel = createBarrel();

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

        /*var freeCamera = createFreeCamera();
        scene.activeCamera = freeCamera;
        scene.collisionsEnabled = true;

        freeCamera.attachControl(canvas);
        freeCamera.applyGravity = true;
        freeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        freeCamera.checkCollisions = true;*/

        engine.runRenderLoop(function() {
            scene.render();
            if(tank) {
                applyTankMovements();
                fire();
            }
        });
    }
    else { setTimeout(function(){waitForIt()},300); }
}

function createFreeCamera(scene) {
    var camera = new BABYLON.FreeCamera("c1",new BABYLON.Vector3(0, 10, 0), scene);
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
    if(flag === 1) {
        hemisphericlight.intensity = .3;
    }
    return hemisphericlight;
}

function createGround() {
    var ground = new BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/myHeightMap.png", 500, 500, 20, 0, 10, scene, false, onGroundCreated);
>>>>>>> 8f3aa506423a9171c4ea4362fde3ae2752ac27c3

    createScene();

    //Listeners
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
<<<<<<< HEAD

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
        cactus = createCactus();
        radar = createRadar();
        cow = createCow();
        bustedTank = createBustedTank();
        helipad = createHelipad();
        oilStorage = createOilStorage();
        palmTree = createPalmTree();
        tree = createTree();
        rocks1 = createRocks1();
        rocks2 = createRocks2();
        barrel = createBarrel();

        waitForIt();
||||||| merged common ancestors
}

function createTank(assetName) {
    BABYLON.SceneLoader.ImportMesh("", "GameObjects/", assetName, scene, onSuccess);
    function onSuccess(newMeshes, particles, skeletons) {
        tank = newMeshes[0];
        //tank.position.y += 20;
        tank.checkCollisions = true;
        tank.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        tank.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
        tank.applyGravity = true;
        tank.frontVector = new BABYLON.Vector3(0, 0, -1);
        tank.rotationSensitivity = .1;
        tank.speed = 1;
        isTankReady = true;
        console.log("returning tank of type " + typeof tank + " and isTankReady = " + isTankReady);
        return tank;
=======
}

function createTank(assetName) {
    BABYLON.SceneLoader.ImportMesh("", "GameObjects/", assetName, scene, onSuccess);
    function onSuccess(newMeshes, particles, skeletons) {
        tank = newMeshes[0];
        //tank.position.y += 20;
        tank.checkCollisions = true;
        tank.position = new BABYLON.Vector3(Math.floor((Math.random() * 100) + 1),0,Math.floor((Math.random() * 100) + 1))
        tank.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        tank.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
        tank.applyGravity = true;
        tank.frontVector = new BABYLON.Vector3(0, 0, -1);
        tank.rotationSensitivity = .1;
        tank.speed = 1;
        isTankReady = true;
        console.log("returning tank of type " + typeof tank + " and isTankReady = " + isTankReady);
        return tank;
>>>>>>> 8f3aa506423a9171c4ea4362fde3ae2752ac27c3
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
        cactus = createCactus();
        radar = createRadar();
        cow = createCow();
        bustedTank = createBustedTank();
        helipad = createHelipad();
        oilStorage = createOilStorage();
        palmTree = createPalmTree();
        tree = createTree();
        rocks1 = createRocks1();
        rocks2 = createRocks2();
        barrel = createBarrel();

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

            /*var freeCamera = createFreeCamera();
            scene.activeCamera = freeCamera;
            scene.collisionsEnabled = true;

            freeCamera.attachControl(canvas);
            freeCamera.applyGravity = true;
            freeCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            freeCamera.checkCollisions = true;*/

            engine.runRenderLoop(function() {
                scene.render();
                if(tank) {
                    applyTankMovements();
                    checkRays(tank);
                    fire();
                }
            });
        }
        else { setTimeout(function(){waitForIt()},300); }
    }

    function createFreeCamera(scene) {
        var camera = new BABYLON.FreeCamera("c1",new BABYLON.Vector3(0, 10, 0), scene);
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
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/skybox", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        isPickable = false;
        return skybox;
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

    function createTank(assetName) {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", assetName, scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            tank = newMeshes[0];
            //tank.position.y += 20;
            tank.checkCollisions = true;
            tank.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            tank.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            tank.applyGravity = true;
            tank.frontVector = new BABYLON.Vector3(0, 0, -1);
            tank.rotationSensitivity = .1;
            tank.speed = 1;
            isTankReady = true;
            console.log("returning tank of type " + typeof tank + " and isTankReady = " + isTankReady);
            return tank;
        }
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

        tank.frontVector.x = Math.sin(tank.rotation.y) * -1;
        tank.frontVector.z = Math.cos(tank.rotation.y) * -1;
        tank.frontVector.y = -4; // adding a bit of gravity
    }

    function createCactus() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "cactus.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            cactus = newMeshes[0];
            var cactusMaterial = new BABYLON.StandardMaterial("cactusMat", scene);
            cactusMaterial.diffuseColor = new BABYLON.Color3(.26, .65, .36);
            cactus.material = cactusMaterial;
            cactus.position.x += 50;
            cactus.scaling.x *=.5;
            cactus.scaling.z *=.5;
            cactus.checkCollisions = true;
            cactus.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            cactus.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            cactus.applyGravity = true;
            return cactus;
        }
    }

    function createRadar() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "radar.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            radar = newMeshes[0];
            radar.position.x += 20;
            radar.position.z += 100;
            radar.checkCollisions = true;
            radar.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            radar.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            radar.applyGravity = true;
            return radar;
        }
    }

    function createCow() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "cow.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            cow = newMeshes[0];
            cow.position.x -= 20;
            cow.position.z += 15;
            cow.checkCollisions = true;
            cow.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            cow.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            cow.applyGravity = true;
            return cow;
        }
    }

    function createBustedTank() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "bustedTank.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            bustedTank = newMeshes[0];
            bustedTank.position.x -= 50;
            bustedTank.position.z += 5;
            bustedTank.checkCollisions = true;
            bustedTank.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            bustedTank.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            bustedTank.applyGravity = true;
            return bustedTank;
        }
    }

    function createHelipad() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "helipad.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            helipad = newMeshes[0];
            helipad.position.x += 100;
            helipad.position.z += 62;
            helipad.scaling.x *=2;
            helipad.scaling.z *=2;
            helipad.checkCollisions = true;
            helipad.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            helipad.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            helipad.applyGravity = true;
            return helipad;
        }
    }

    function createOilStorage() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "oilStorage.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            oilStorage = newMeshes[0];
            oilStorage.position.x += 10;
            oilStorage.position.z -= 100;
            oilStorage.scaling.x *=3;
            oilStorage.scaling.z *=3;
            oilStorage.checkCollisions = true;
            oilStorage.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            oilStorage.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            oilStorage.applyGravity = true;
            return oilStorage;
        }
    }

    function createPalmTree() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "palmTree.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            palmTree = newMeshes[0];
            palmTree.position.x += 30;
            palmTree.position.z -= 100;
            palmTree.scaling.x *=1.5;
            palmTree.scaling.z *=1.5;
            palmTree.checkCollisions = true;
            palmTree.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            palmTree.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            palmTree.applyGravity = true;
            return palmTree;
        }
    }

    function createTree() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "tree.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            tree = newMeshes[0];
            tree.position.x -= 75;
            tree.position.z -= 75;
            tree.scaling.x *=1.5;
            tree.scaling.z *=1.5;
            tree.checkCollisions = true;
            tree.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            tree.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            tree.applyGravity = true;
            return tree;
        }
    }

    function createRocks1() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "rocks1.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            rocks1 = newMeshes[0];
            rocks1.position.x += 75;
            rocks1.position.z -= 75;
            //rocks1.scaling.x *=1.5;
            //rocks1.scaling.z *=1.5;
            rocks1.checkCollisions = true;
            rocks1.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            rocks1.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            rocks1.applyGravity = true;
            return rocks1;
        }
    }

    function createRocks2() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "rocks2.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            rocks2 = newMeshes[0];
            rocks2.position.x += 65;
            rocks2.position.z -= 75;
            rocks2.checkCollisions = true;
            rocks2.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            rocks2.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            rocks2.applyGravity = true;
            return rocks2;
        }
    }

    function createBarrel() {
        BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "barrel.babylon", scene, onSuccess);
        function onSuccess(newMeshes, particles, skeletons) {
            barrel = newMeshes[0];
            barrel.position.x += 10;
            barrel.position.z -= 10;
            barrel.checkCollisions = true;
            barrel.ellipsoid = new BABYLON.Vector3(1, 1, 1);
            barrel.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);
            barrel.applyGravity = true;
            isPickable = true;
            return barrel;
        }
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
}