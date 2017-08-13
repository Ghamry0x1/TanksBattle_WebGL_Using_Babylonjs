//python -m http.server

document.addEventListener("DOMContentLoaded", startGame, false);

var canvas;
var engine;
var scene;
var tank;

var isWPressed = false;
var isSPressed = false;
var isDPressed = false;
var isAPressed = false;

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

    var followCamera = createFollowCamera();
    scene.activeCamera = followCamera;
    followCamera.attachControl(canvas);

    engine.runRenderLoop(function() {
        scene.render();
        applyTankMovements();
    });
}

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
    var camera = new BABYLON.FollowCamera("followCamera", new BABYLON.Vector3(0, 2, -20), scene);
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

function createHero() {
    var tank = new BABYLON.Mesh.CreateBox("tank", 2, scene);
    var tankMaterial = new BABYLON.StandardMaterial("tankMat", scene);
    tankMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);
    tank.material = tankMaterial;

    tank.position.y += 1;
    tank.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
    tank.ellipsoidOffset = new BABYLON.Vector3(0, 2.0, 0);

    tank.scaling.y *= .5;
    tank.scaling.x = .5;
    tank.scaling.z = 1;

    tank.rotationSensitivity = .1;
    tank.speed = 1;
    tank.frontVector = new BABYLON.Vector3(0, 0, -1);
    tank.checkCollisions = true;
    tank.applyGravity = true;

    return tank;
}

function createTank() {
    /*var tank2 = BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "tank.babylon", scene, onSuccess);
    function onSuccess(newMeshes, particles, skeletons) {


    tank = newMeshes[0];
        console.log( typeof tank2);

        tank2.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        tank2.position.y = 3.392;
        tank2.checkCollisions = true;
        tank2.ellipsoid = new BABYLON.Vector3(1, 1, 1);
        tank2.ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);

        tank2.applyGravity = true;
    }
    return tank2;*/

    //works
    /*var assetsManager = new BABYLON.AssetsManager(scene);
    var tank2 = assetsManager.addMeshTask("tank", "", "GameObjects/", "cartoontank.babylon");
    tank2.onSuccess = function (task) {
        console.log("loaded as " + typeof tank2);
        task.loadedMeshes[0].position = BABYLON.Vector3.Zero();
        task.loadedMeshes[0].position.y += 1;
        task.loadedMeshes[0].checkCollisions = true;

        tank2.position.y += 1;
        tank2.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
        tank2.ellipsoidOffset = new BABYLON.Vector3(0, 2.0, 0);
        tank2.scaling.y *= .5;
        tank2.scaling.x = .5;
        tank2.scaling.z = 1;

        tank2.material.wireframe = true;

        tank2.rotationSensitivity = .1;
        tank2.speed = 1;
        tank2.frontVector = new BABYLON.Vector3(0, 0, -1);
        tank2.checkCollisions = true;
        tank2.applyGravity = true;

    }
    assetsManager.onFinish = function(tasks) {
        engine.runRenderLoop(function() {
            scene.render();
        });
    };
    assetsManager.load();
    return tank2;*/

    //works
    tank2 = BABYLON.SceneLoader.Load("GameObjects/", "tank1.babylon", engine, function () {
        console.log("tank2 loaded as " + typeof tank2);
    });
    var loader = new BABYLON.AssetsManager(scene);
    var tank2 = loader.addMeshTask("cartoontank", "", "GameObjects/", "tank1.babylon");

    BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "tank1.babylon", scene, function (meshes) {
        console.log("import mesh done");
        tank2.position.y += 10;
        tank2.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
        tank2.ellipsoidOffset = new BABYLON.Vector3(0, 2.0, 0);
        tank2.scaling.y *= .5;
        tank2.scaling.x = .5;
        tank2.scaling.z = 1;
        //tank2.workerCollisions = true
    });

    console.log(typeof tank2);
    return tank2;

    /*BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "cartoontank.babylon", scene, onTankLoaded);
    function onTankLoaded() {
        console.log(typeof this);
        tank2 = this;
        console.log(typeof tank2);
        tank2.position.y += 1;
        tank2.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
        tank2.ellipsoidOffset = new BABYLON.Vector3(0, 2.0, 0);
        tank2.scaling.y *= .5;
        tank2.scaling.x = .5;
        tank2.scaling.z = 1;
        tank2.workerCollisions = true

    }*/

    //var x = new Object();


    /*BABYLON.SceneLoader.ImportMesh("", "GameObjects/", "cartoontank.babylon", scene, onTankLoaded);
    function onTankLoaded(newMeshes, particleSystems,skeletons) {
        console.log(typeof this);
        tank2 = this;
        console.log(typeof tank2);

        dudes[0] = newMeshes[0];
        dudes[0].scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        dudes[0].position.y = 3.392;
        dudes[0].checkCollisions = true;
        dudes[0].ellipsoid = new BABYLON.Vector3(1, 1, 1);
        dudes[0].ellipsoidOffset = new BABYLON.Vector3(0, 2, 0);

        dudes[0].applyGravity = true;
        //  dudes[0].onCollide = function () { console.log('I am colliding with something') }

        dudes[0].skeletons = [];
        for (var i = 0; i < skeletons.length; i += 1) {
            dudes[0].skeletons[i] = skeletons[i];
            scene.beginAnimation(dudes[0].skeletons[i], 0, 120, 1.0, true);
        }

        console.log(typeof dudes[0]);

        tank2.position.y += 1;
        tank2.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
        tank2.ellipsoidOffset = new BABYLON.Vector3(0, 2.0, 0);
        tank2.scaling.y *= .5;
        tank2.scaling.x = .5;
        tank2.scaling.z = 1;
        tank2.workerCollisions = true
    }*/
}