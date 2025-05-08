window.addEventListener("load",()=>{
    const video = document.querySelector(".video-background");
    video.load();
    video.play();
    video.playbackRate=0.5;
})

VanillaTilt.init(document.querySelectorAll(".box"),{
    max:25,
    speed:500,
    glare:true,"max-glare":0.5,
    scale:1.1
});

const boxes = document.querySelectorAll(".box");
const restartBtn = document.querySelector("#restart");
const statustxt = document.querySelector(".status");
let x="X";
let o="O";

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options=["","","","","","","","",""];
let currentPlayer=x;
let player='X';
let running=false;
init();
function init(){
    boxes.forEach(box=>box.addEventListener('click',boxClick));
    restartBtn.addEventListener('click',restartGame);
    statustxt.textContent=`${player} Your Turn`;
    running = true;
}

function boxClick(){
    const index=this.dataset.index;
    if(options[index]!="" || !running){
        return;
    }
    updateBox(this,index);
    checkWinner();

}

function updateBox(box,index){
    options[index]=player;
    if(player=='X')
    {
        box.style.color="white";
        box.style.textShadow="0 0 10px rgba(0, 0, 255, 1), 0 0 20px rgba(0, 0, 255, 1), 0 0 30px rgba(0, 0, 255, 1)";
    }
    else{
        box.style.color="white";
        box.style.textShadow="0 0 10px rgba(255, 0, 0, 1), 0 0 20px rgba(255, 0, 0, 1), 0 0 30px rgba(255, 0, 0, 1)";
    }
    
    box.textContent=currentPlayer;
}

function changePlayer(){
    player=(player=='X') ? "O" : "X";
    currentPlayer=(currentPlayer==x) ? o:x;
    statustxt.textContent=`${player} Your Turn`;

}

function checkWinner(){
    let isWon=false;
    for(let i=0;i<win.length;i++)
    {
        const condition=win[i];
        const box1=options[condition[0]];
        const box2=options[condition[1]];
        const box3=options[condition[2]];
        if(box1=="" || box2=="" || box3=="")
        {
            continue;
        }
        if(box1==box2 && box2==box3)
        {
            isWon=true;
            boxes[condition[0]].classList.add('win');
            boxes[condition[1]].classList.add('win');
            boxes[condition[2]].classList.add('win');
        }
    }
    if(isWon){
        statustxt.textContent=`${player} Won`;
        running=false;

    }else if(!options.includes("")){
        statustxt.textContent='Game Draw';
        running=false;
    }
    else{
        changePlayer()
    } 

}

function restartGame(){
    options=["","","","","","","","",""];
    currentPlayer=x;
    player='X';
    running=true;
    statustxt.textContent=`${player} Your Turn`;
    boxes.forEach(box=>{
        box.innerHTML="";
        box.classList.remove("win");
    })
}