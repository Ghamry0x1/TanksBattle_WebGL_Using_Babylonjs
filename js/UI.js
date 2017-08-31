document.addEventListener("DOMContentLoaded", UI, false);

function UI() {
    document.getElementById("renderCanvas").style.display = "none";
    document.getElementById("InstructionsCanvas").style.display = "none";
    document.getElementById("CreditsCanvas").style.display = "none";
    document.getElementById("MapsCanvas").style.display = "none";
    document.getElementById("GameOverCanvas").style.display = "none";
    document.getElementById("timerContainer").style.display = "none";
    document.getElementById("PlayerContainer").style.display = "none";
    document.getElementById("slider").style.display = "none";
    document.getElementById("NTanksContainer").style.display = "none";
    document.getElementById("WinnerContainer").style.display = "none";

    document.getElementById("sandBtn").style.display = "none";
    document.getElementById("fogBtn").style.display = "none";
    document.getElementById("backBtn").style.display = "none";
    document.getElementById("rematchBtn").style.display = "none";

    document.getElementById("UICanvas").style.display = "inline";

    var canvas = document.getElementById("UICanvas");
    var context = canvas.getContext("2d");
    var bgImage = new Image();

    bgImage.onload = function(){
        context.drawImage(bgImage, 0, 0);
    };
    bgImage.src = "images/StartPage.png";
}