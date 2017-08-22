document.addEventListener("DOMContentLoaded", UI, false);
function UI() {
    document.getElementById("renderCanvas").style.display = "none";
    document.getElementById("InstructionsCanvas").style.display = "none";
    document.getElementById("CreditsCanvas").style.display = "none";
    document.getElementById("MapsCanvas").style.display = "none";
    document.getElementById("player1").style.display = "none";
    document.getElementById("player2").style.display = "none";

    var container1 = document.getElementsByClassName("container1");
    container1[0].style.display = "none";
    var bar1 = document.getElementsByClassName("bar1");
    bar1[0].style.display = "none";
    var bar_fill1 = document.getElementsByClassName("bar-fill1");
    bar_fill1[0].style.display = "none";

    var container2 = document.getElementsByClassName("container2");
    container2[0].style.display = "none";
    var bar2 = document.getElementsByClassName("bar2");
    bar2[0].style.display = "none";
    var bar_fill2 = document.getElementsByClassName("bar-fill2");
    bar_fill2[0].style.display = "none";

    document.getElementById("UICanvas").style.display = "inline";

    var canvas = document.getElementById("UICanvas");
    var context = canvas.getContext("2d");
    var bgImage = new Image();

    bgImage.onload = function(){
        context.drawImage(bgImage, 0, 0);
    };
    bgImage.src = "images/StartPage.png";

    document.onmouseup = point_it;
    function point_it(event) {
        if((event.offsetX>=536&&event.offsetX<=802)&&(event.offsetY>=314&&event.offsetY<=382)) {
            console.log("play");
            onclick("MapsCanvas");
        }
        if((event.offsetX>=536&&event.offsetX<=802)&&(event.offsetY>=402&&event.offsetY<=472)) {
            console.log("instructions");
            onclick("InstructionsCanvas");
        }
        if((event.offsetX>=536&&event.offsetX<=802)&&(event.offsetY>=488&&event.offsetY<=558)) {
            console.log("credits");
            onclick("CreditsCanvas");
        }
    }
}