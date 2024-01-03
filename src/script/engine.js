const state = {
view:{ 
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lifes: document.querySelector("#lifes"),
},
values:{
    timerId: null,
    countDownTimerId: setInterval(countDown, 1000),
    gameVelocit: 1000,
    hitPosition:0,
    result: 0,
    curretTime: 59,
    lifesId: 3,
}

};
function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;
    if(state.values.curretTime <= 0){
        clearInterval(state.countDownTimerId);
        clearInterval(state.timerId);
        alert("Game Over! O seu resultado foi "+ state.values.result);
    }
}
function playSound(audioName){
   let audio = new Audio("/src/audios/hit.m4a");
    audio.volume = 0.1;
   audio.play(); 
}
function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
  
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocit)
}

function addListenerHitBox(){
   state.view.squares.forEach((square)=>{
    square.addEventListener("mousedown",()=>{
       if(square.id === state.values.hitPosition){
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
       }
    });
   });
}
function initialize(){
    moveEnemy();
    addListenerHitBox();
}

function reduceLife() {
    if (state.values.lifesId > 0) {
        state.values.lifesId--;
        state.view.lifes.textContent = state.values.lifesId;
    }
    if (state.values.lifesId === 0) {
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! O seu resultado foi " + state.values.result+ " pontos");
    }
}

function addListenerHitBox(){
   state.view.squares.forEach((square)=>{
    square.addEventListener("mousedown",()=>{
       if(square.id === state.values.hitPosition){
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound();
       } else {
        reduceLife();
       }
    });
   });
}

initialize();
