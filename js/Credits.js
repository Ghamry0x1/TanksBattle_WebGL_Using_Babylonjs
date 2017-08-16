function Credits() {
    var canvas = document.getElementById("CreditsCanvas");
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var bgImage = new Image();

    bgImage.onload = function(){
        context.drawImage(bgImage, 0, 0);
    };
    bgImage.src = "images/CreditsPage.png";

    //back btn coordinates
    document.onmouseup = point_it;
    function point_it(event){
        if((event.offsetX>=1129&&event.offsetX<=1279)&&(event.offsetY>=542&&event.offsetY<=592)) {
            console.log("back");
            onclick("UICanvas");
        }
    }
}