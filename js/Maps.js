var n;

function Maps() {
    var canvas = document.getElementById("MapsCanvas");
    var context = canvas.getContext("2d");
    var bgImage = new Image();

    bgImage.onload = function(){
        context.drawImage(bgImage, 0, 0);
    };
    bgImage.src = "images/PlayPage.png";

    gameOver = 0;
    //NTanks
    n = document.getElementById("Label").value;
    if(n < 2 || n == " ")
        n=2;
    if(n>8)
        n=8;
}