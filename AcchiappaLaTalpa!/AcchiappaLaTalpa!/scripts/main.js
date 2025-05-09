//variables
let timerTalpa; //timer that sets the interval of the talpa position
let timeToPlay = 800; //time of a single the game
let rnd;
let points = 0;
let interval = 1000; //un secondo
let GameTimer; //timer del gioco
let TimeForGame = 30;

let IsPlaying = false;

function RandomPosition(){
    // Returns a random integer from 1 to 12:
    rnd = Math.floor(Math.random() * 12) + 1;

    //then it'll be converted into a string
    return rnd.toString();
}

function TalpaPosition(){

    //reset of the positon every second
    for (let i = 1; i <= 12; i++) {
        document.getElementById(i.toString()).style.backgroundImage = `url(./images/Hole.png)`;
    }

    let id = RandomPosition();
    document.getElementById(id).style.backgroundImage = `url(./images/Mole.png)`;
}

function StartTimer(){
     //start the timer
     timerTalpa = setInterval(TalpaPosition, timeToPlay);
}
function StopTimer(){
    clearInterval(timerTalpa);
}

function CatchMole(id){
    let idZone;
    let sfxAudio;

    //switch case per tradurre l'id del div interno alla cella della table
    switch (id) {
        case 'one': idZone = '1'; break;
        case 'two': idZone = '2'; break;
        case 'three': idZone = '3'; break;
        case 'four': idZone = '4'; break;
        case 'five': idZone = '5'; break;
        case 'six': idZone = '6'; break;
        case 'seven': idZone = '7'; break;
        case 'eight': idZone = '8'; break;
        case 'nine': idZone = '9'; break;
        case 'ten': idZone = '10'; break;
        case 'eleven': idZone = '11'; break;
        case 'twelve': idZone = '12'; break;
        default:
            console.log("Error: ID not found");
            break;
    }

    //controllo che se la partita non è iniziata non faccia nulla
    if(IsPlaying === false){
        //non fa nulla
    }
    else{
        try {

            let element = document.getElementById(idZone); //picks the div's id
            let ActualImage = window.getComputedStyle(element).backgroundImage; //picks style from the clicked div

            //controlling wich image is in the div
            if (ActualImage.includes("Mole.png")) {
                console.log("Killed!!!!");
                points+= 10;

                sfxAudio = new Audio('./sounds/KilledSound.mp3');
                sfxAudio.play();

                document.getElementById(idZone).style.backgroundImage = `url(./images/HittedMole.png)`;
            } else if (ActualImage.includes("Hole.png")) {

                sfxAudio = new Audio('./sounds/RetrySound.mp3');
                sfxAudio.play();
                points-= 5;
                console.log("HAHAHAH Retry!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    
}

function StartGame(){
    GameTimer = setInterval(Time, interval);
    document.getElementById("play").value = 'Playing...';
    document.getElementById("play").style.backgroundColor = 'grey';
    document.getElementById("play").disabled = true;
    IsPlaying = true;
}

function Time(){
    TimeForGame--;

    if(TimeForGame === 0){
        clearInterval(GameTimer);
        clearInterval(timerTalpa);
        console.log("Game Over");
        //alert('Game Over: your score is: ' + points.toString()); // StopTimer();

        //adding the score to the score table
        let scoreBoard = document.getElementById("scoreBoard");
        scoreBoard.style.display = 'block';
        scoreBoard.style.border = '3px solid black';
        scoreBoard.style.borderRadius = '10px';
        scoreBoard.style.backgroundColor = 'white';
        scoreBoard.style.width = '400px';
        scoreBoard.style.height = '400px';
        scoreBoard.style.position = 'fixed';
        scoreBoard.style.top = '300px';

        if (points > 0) {
            //audio for winning
            let sfxResult = new Audio('./sounds/WinSound.mp3');
            sfxResult.play();

            scoreBoard.innerHTML = `<div align="center" id="scoreBoardImage"></div>`;
            let scoreBoardImage = document.getElementById("scoreBoardImage");
            scoreBoardImage.style.width = '200px';
            scoreBoardImage.style.height = '200px';
            scoreBoardImage.style.backgroundSize = 'contain';
            scoreBoardImage.style.backgroundImage = `url(./images/HittedMole.png)`;
            scoreBoardImage.style.marginTop = '25px';

            scoreBoard.innerHTML += `<br/>`;
            scoreBoard.innerHTML += `<h2 id="scoreBoardTitle">You Won!</h2>`;
            scoreBoard.innerHTML += `<p id="scoreBoardPoints">Your score is: ${points.toString()} p.ts</p>`;

            let scoreBoardTitle = document.getElementById("scoreBoardTitle");
            let scoreBoardPoints = document.getElementById("scoreBoardPoints");
            scoreBoardPoints.style.fontFamily = 'verdana';
            scoreBoardTitle.style.fontFamily = 'verdana';

            scoreBoard.innerHTML += `<input type="button" id="playAgain" value="Play Again" onclick="RestartGame()">`;
            let playAgain = document.getElementById("playAgain");
            playAgain.style.backgroundColor = 'green';
            playAgain.style.color = 'white';
            playAgain.style.width = '100px';
            playAgain.style.height = 'auto';
            playAgain.style.borderRadius = '5px';

            scoreBoard.innerHTML += `&nbsp;`;

            scoreBoard.innerHTML += `<input type="button" id="ResetGame" value="Reset" onclick="ResetGame()">`;
            let ResetGame = document.getElementById("ResetGame");
            ResetGame.style.backgroundColor = 'red';
            ResetGame.style.color = 'white';
            ResetGame.style.width = '100px';
            ResetGame.style.height = 'auto';
            ResetGame.style.borderRadius = '5px';

            IsPlaying = false;
        }
        else {
            //audio for losing
            let sfxResult = new Audio('./sounds/DefeatSound.mp3');
            sfxResult.play();

            scoreBoard.innerHTML = `<div align="center" id="scoreBoardImage"></div>`;
            let scoreBoardImage = document.getElementById("scoreBoardImage");
            scoreBoardImage.style.width = '200px';
            scoreBoardImage.style.height = '200px';
            scoreBoardImage.style.backgroundSize = 'contain';
            scoreBoardImage.style.backgroundImage = `url(./images/Mole.png)`;
            scoreBoardImage.style.marginTop = '25px';

            scoreBoard.innerHTML += `<br/>`;
            scoreBoard.innerHTML += `<h2 id="scoreBoardTitle">You lost...</h2>`;
            scoreBoard.innerHTML += `<p id="scoreBoardPoints">Your score is: ${points.toString()} p.ts</p>`;

            let scoreBoardTitle = document.getElementById("scoreBoardTitle");
            let scoreBoardPoints = document.getElementById("scoreBoardPoints");
            scoreBoardPoints.style.fontFamily = 'verdana';
            scoreBoardTitle.style.fontFamily = 'verdana';

            scoreBoard.innerHTML += `<input type="button" id="playAgain" value="Play Again" onclick="RestartGame()">`;
            let playAgain = document.getElementById("playAgain");
            playAgain.style.backgroundColor = 'green';
            playAgain.style.color = 'white';
            playAgain.style.width = '100px';
            playAgain.style.height = 'auto';
            playAgain.style.borderRadius = '5px';

            scoreBoard.innerHTML += `&nbsp;`;

            scoreBoard.innerHTML += `<input type="button" id="ResetGame" value="Reset" onclick="ResetGame()">`;
            let ResetGame = document.getElementById("ResetGame");
            ResetGame.style.backgroundColor = 'red';
            ResetGame.style.color = 'white';
            ResetGame.style.width = '100px';
            ResetGame.style.height = 'auto';
            ResetGame.style.borderRadius = '5px';

            IsPlaying = false;
        }
           
        // Reset the board
        for (let i = 1; i <= 12; i++) {
            document.getElementById(i.toString()).style.backgroundImage = `url(./images/Hole.png)`;
        }
    }
}

function RestartGame(){
    // Reset the board
    for (let i = 1; i <= 12; i++) {
        document.getElementById(i.toString()).style.backgroundImage = `url(./images/Hole.png)`;
    }
    points = 0;
    TimeForGame = 4;
    IsPlaying = false;

    document.getElementById("play").value = 'Play';
    document.getElementById("play").style.backgroundColor = 'green';
    let scoreBoard = document.getElementById("scoreBoard");
    scoreBoard.style.display = 'none';
    document.getElementById("play").disabled = true;

    //restarting the game
    StartGame();
    StartTimer();
    console.log("Game Restarted");
    IsPlaying = true;
}

function ResetGame(){
    // Reset the board
    for (let i = 1; i <= 12; i++) {
        document.getElementById(i.toString()).style.backgroundImage = `url(./images/Hole.png)`;
    }
    points = 0;
    TimeForGame = 30;
    IsPlaying = false;

    document.getElementById("play").disabled = false;
    document.getElementById("play").value = 'Play';
    document.getElementById("play").style.backgroundColor = 'green';
    let scoreBoard = document.getElementById("scoreBoard");
    scoreBoard.style.display = 'none';
}


