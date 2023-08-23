//global variables

targetWidth = 800;
targetHeight = 1160;
width = Math.min(targetWidth, window.innerWidth);
height = Math.min(targetHeight, window.innerHeight);
let player1_Score = 0;
let player2_Score = 0;
let gameStarted = false;

//we are using local storage to keep track of HighScore and the person who scored it
//using local storage enables us to retrieve data even after refreshing the page
let leadingPlayer = localStorage.getItem('leadingPlayer') || "This is your First game";
let topScore = localStorage.getItem('topScore') || "0";


//game objects
let player = {
pWidth : 150,
pHeight : 40,
pSpeed : 100,
pX : 475,
}
//player 1 has one property different from player 2 thats "y" direction.
let player1 = {
    p1Y : 10,
}
let player2 = {
p2Y : height - 50,
}
let ball = {
    x : width/2,
    y : height/2,
    VX : 5,
    VY : 5, //Game level set to easy by default for testing
    //increasing the velocity makes the game challenging
    //5 is easy level, 10 is medium and 15 is hard
    
}
// Get the audio element
const clickSound = document.getElementById("clickSound");
const gameUP = document.getElementById("gameUP");



//functions
function init(){
    var canvas=document.getElementById("myCanvas");
    canvas.width = width;
    canvas.height = height;
    pen=canvas.getContext('2d');
    

    drawball();
    drawLine();
    gameloop(canvas);
}

// Display initial alert message
window.alert("Press Enter TWICE to start the game");

// Listen for the Enter key press to start the game
window.addEventListener("keydown", function(event) {
    if (!gameStarted && event.key == "Enter") {
        gameStarted = true; // Set gameStarted to true
        init(); // Start the game only once when Enter key is pressed
    }
});

function gameloop(canvas){
    const pen = canvas.getContext("2d");
    pen.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawball();
    drawLine();
    moveBall();
    ballCollision();
    // Call other update functions if needed

    requestAnimationFrame(() => gameloop(canvas)); //this line actually makes the "looping work" 
};

function drawLine(){
    //a thin dotted mid-line that goes over canvas board
    pen.beginPath();
    pen.setLineDash([20]);
    pen.moveTo(0, height/2);
    pen.lineTo(width, height/2);
    pen.strokeStyle = "black";
    pen.stroke();
}

function drawPlayer(){
    pen.fillStyle  = 'blue';
    pen.fillRect(player.pX, player1.p1Y, player.pWidth, player.pHeight);
    pen.strokeRect(player.pX, player1.p1Y, player.pWidth, player.pHeight);
    pen.fillRect(player.pX, player2.p2Y , player.pWidth, player.pHeight);
    pen.strokeRect(player.pX, player2.p2Y , player.pWidth, player.pHeight);

}
//eventListener that is responsible for catching the keyPress of playerBar movement 
window.addEventListener("keydown", movePlayer);

function movePlayer(event){
    const keyPressed = event.keyCode;
    
    const playerRight = 68;
    const playerLeft = 65;
    const RightArrow = 39;
    const LeftArrow = 37;
    
    switch (keyPressed) {
        case RightArrow:
        case playerRight:
            if (player.pX + player.pWidth < width) {
                player.pX += player.pSpeed;
            }
            break;
    
        case LeftArrow:
        case playerLeft:
            if (player.pX > 0) {
                player.pX -= player.pSpeed;
            }
            break;
    }
    
    
}

function drawball(){
    pen.beginPath();

    pen.arc(ball.x, ball.y, 35, 2*Math.PI, false);
    pen.fillStyle = "red";
    pen.fill();

}

function moveBall(){
    ball.x += ball.VX;
    ball.y += ball.VY;
    //make the ball to reverse the 'x' direction when touches side borders
   if(ball.x < 0 || ball.x > width){
    ball.VX *= -1;
   }
   //make the ball to reset position when 'Y' direction goes out of boundary
   if (ball.y < 0 ){
    // Play the sound effect
    gameUP.play();
    player2_Score++;
    console.log("player2_Score:", player2_Score);
    if (player1_Score > player2_Score) {
        leadingPlayer = "Player 1";
    } else {
        leadingPlayer = "Player 2";
    }

    
    leadScore = Math.max(topScore, player1_Score, player2_Score); //gets the highest score
    localStorage.setItem('topScore', leadScore); //updates the value to topScore (topScore is variable present in local storage)
    localStorage.setItem('leadingPlayer', leadingPlayer); //update the leadingPlayer also (in Local Storage)
    let retrievedHighScore = localStorage.getItem('topScore'); // Retrieves the value from Local Storage

    //show alert
    window.alert("player 2 win this round, High Score is"  +
     "  :  " + retrievedHighScore +
      ", scored  by "+ leadingPlayer +
      "        please press ENTER to start next round")
    resetBall(); //calling reset function
   }else if (ball.y > height){
    // Play the sound effect
    gameUP.play();
    player1_Score++;
    console.log("player1_Score:", player1_Score)
    if (player1_Score > player2_Score) {
        leadingPlayer = "Player 1";
    } else {
        leadingPlayer = "Player 2";
    }


    leadScore = Math.max(topScore, player1_Score, player2_Score); //gets the highest score
    localStorage.setItem('topScore', leadScore); //updates the value to topScore (topScore is variable present in local storage)
    let retrievedHighScore = localStorage.getItem('topScore'); // Retrieves the value from Local Storage
    localStorage.setItem('leadingPlayer', leadingPlayer); //update the leadingPlayer also (in Local Storage)

    //show alert
    window.alert("player 1 win this round, High Score is"  +
     "  :  " + retrievedHighScore +
      ", scored  by "+ leadingPlayer +
      "        please press ENTER to start next round")
    resetBall(); //calling reset function
   }

}

function resetBall(){
   // bringing ball to middle position
    ball.x = width/2;
    ball.y = height/2;
    // bringing playerBar to normal location
    player.pX = width/2 - player.pWidth/2;

}

function ballCollision(){
    
 // When the ball collides with playerBar then reverse the Y direction
 if ((ball.y < player1.p1Y + player.pHeight) && (ball.x >= player.pX && ball.x <= player.pX + player.pWidth)) {
    ball.VY *= -1;
    // Play the sound effect
clickSound.play();

    
}
 // When the ball collides with playerBar then reverse the Y direction
if ((ball.y > player2.p2Y - player.pHeight) && (ball.x >= player.pX && ball.x <= player.pX + player.pWidth)) {
    ball.VY *= -1;
    // Play the sound effect
clickSound.play();

   
}

}
