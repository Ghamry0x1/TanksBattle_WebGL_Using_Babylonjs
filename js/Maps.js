function Maps() {
    var canvas = document.getElementById("MapsCanvas");
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var bgImage = new Image();

    bgImage.onload = function(){
        context.drawImage(bgImage, 0, 0);
    };
    bgImage.src = "images/PlayPage.png";

    document.onmouseup = point_it;
    function point_it(event){
        //back btn coordinates
        if((event.offsetX>=1129&&event.offsetX<=1279)&&(event.offsetY>=542&&event.offsetY<=592)) {
            console.log("back");
            onclick("UICanvas");
        }
        //sand
        if((event.offsetX>=66&&event.offsetX<=352)&&(event.offsetY>=206&&event.offsetY<=398)) {
            console.log("sand");
            sceneNum = 0;
            onclick("renderCanvas");
        }
        //fog
        if((event.offsetX>=384&&event.offsetX<=668)&&(event.offsetY>=206&&event.offsetY<=398)) {
            console.log("fog");
            sceneNum = 1;
            onclick("renderCanvas");
        }
    }
}