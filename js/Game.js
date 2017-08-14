document.addEventListener("DOMContentLoaded", startGame, false);

var canvas;
var engine;
var scene;
var tank;
//var tankParent;

var isWPressed = false;
var isSPressed = false;
var isDPressed = false;
var isAPressed = false;

var isTankReady = false;

const NEG_Z_VECTOR = new BABYLON.Vector3(0, 0, -1);

function startGame() {
    createScene();
    Listeners();
}

function createScene() {
    canvas = document.getElementById("renderCanvas");
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    engine.isPointerLock = true;
    engine.enableOfflineSupport = false;

    var ground = createGround();
    var light = createLight();
    var skybox = createSkybox();

    tank = createHero();
    //tankParent = createTankParent();
    waitForIt();
}

function waitForIt(){
    if (isTankReady) {
        var followCamera = createFollowCamera();
        scene.activeCamera = followCamera;
        followCamera.attachControl(canvas);

        followCamera.applyGravity = true;
        followCamera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        scene.collisionsEnabled = true;
        followCamera.checkCollisions = true;

        engine.runRenderLoop(function() {
            scene.render();
            if(tank) {
                applyTankMovements();
                //tank.parent = tankParent;
            }
        });
    }
    else { setTimeout(function(){waitForIt()},300); }
}

/*function createFreeCamera(scene) {
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
}*/

function createLight() {
    var hemisphericlight = new BABYLON.HemisphericLight("l1", new BABYLON.Vector3(0, 5, 0), scene);
    return hemisphericlight;
}

function createGround() {
    var ground = new BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/myHeightMap.png", 750, 750, 20, 0, 10, scene, false, onGroundCreated);

    var groundMaterial = new BABYLON.StandardMaterial("m1", scene);
    //groundMaterial.diffuseColor = new BABYLON.Color3(.35, .30, .25);
    groundMaterial.diffuseTexture = new BABYLON.Texture("images/rocks.jpg", scene);

    function onGroundCreated() {
        ground.material = groundMaterial;
        ground.checkCollisions = true;
    }

    return ground;
}

function createSkybox() {
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;
    skybox.infiniteDistance = true;
    skyboxMaterial.disableLighting = true;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

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

function Listeners() {
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
    });
}

function createHero() {
    BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "tank1.babylon", scene, onSuccess);
    function onSuccess(newMeshes, particles, skeletons) {
        tank = newMeshes[0];
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

/*function createTankParent() {
    tankParent = new BABYLON.Mesh.CreateBox("tankParent", 2, scene);

    tankParent.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
    tankParent.ellipsoidOffset = new BABYLON.Vector3(0, 2.0, 0);

    tankParent.scaling.y = 1.8;
    tankParent.scaling.x = .8;
    tankParent.scaling.z = 1.1;

    tankParent.wireframe = true;

    tankParent.rotationSensitivity = .1;
    tankParent.speed = 1;
    tankParent.frontVector = new BABYLON.Vector3(0, 0, -1);
    tankParent.checkCollisions = true;
    tankParent.applyGravity = true;

    return tankParent;
}*/