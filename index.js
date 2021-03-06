var randomNumber ;
var buttonColor= ['red','green','blue','yellow'];
var randomChosenColor;
var gamePattern= [];
var userClickedPattern = [];
var level = 0;
var started = false;
    

//Function to create random number
function nextSequence(){
    userClickedPattern=[];
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("h1").html("Level "+level);
    level+=1;
    $("#"+randomChosenColor).fadeOut(1).fadeIn();
        //$("#"+gamePattern).fadeToggle(0.5);
        //$("#"+gamePattern).fadeToggle();

    playSound(randomChosenColor);
}
  

$(".btn").click(function(id){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);  
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

 function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
    },100);

 }

function checkAnswer(currentLevel){
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
           
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("h1").html("GAME OVER! PRESS ANY KEY TO RESTART");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }

}

function startOver(){
    level = 0;
    gamePattern=[];
    started=false;
}


/*$(document).keypress(function(){
    location.reload();
});*/

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level "+level);
        nextSequence();
        started = true;
    }
    
});
