function GameOver() {
    document.getElementById("renderCanvas").style.display = "none";
    document.getElementById("InstructionsCanvas").style.display = "none";
    document.getElementById("CreditsCanvas").style.display = "none";
    document.getElementById("MapsCanvas").style.display = "none";
    document.getElementById("UICanvas").style.display = "none";
    document.getElementById("timerContainer").style.display = "none";
    document.getElementById("PlayerContainer").style.display = "none";
    document.getElementById("slider").style.display = "none";
    document.getElementById("NTanksContainer").style.display = "none";

    document.getElementById("sandBtn").style.display = "none";
    document.getElementById("fogBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "none";

    document.getElementById("GameOverCanvas").style.display = "inline";
    document.getElementById("rematchBtn").style.display = "inline";
    document.getElementById("WinnerContainer").style.display = "inline";

    var canvas = document.getElementById("GameOverCanvas");
    var context = canvas.getContext("2d");
    var bgImage = new Image();

    bgImage.onload = function(){
        context.drawImage(bgImage, 0, 0);
    };
    bgImage.src = "images/GameOverPage.png";

    //num of last alive tank (o)
    var o;
    for(var i in alive) {
        //keda btlef 3al array alive kolaha
        //fa hena ht3mel el conditions
        //ama t3raf anhi el winner, hoto f variable "o" da
        //hyttbe3 hwa fel satr el taht o+1 da

        /*
        if(bla bla) {
            i = o;
        }
        */
    }

    document.getElementById("Winner").innerHTML = "PLAYER " + (o+1) + " WINS!";
}