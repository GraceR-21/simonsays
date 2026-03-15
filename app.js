console.log("JS loaded");
let gameSeq=[];
let userSeq=[];
let btncol=["red","green","yellow","blue"];
let maxScore=0;

let started=false;
let level=0;
let h3=document.querySelector("h3");

document.addEventListener("keypress",function(){
    if(started==false){
        
        started=true;

        levelUp();
    }
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;

    //choose randm button
    let randno=Math.floor(Math.random()*4);
    let randcolor=btncol[randno];
    let randbtn=document.querySelector(`.${randcolor}`);
    gameSeq.push(randcolor);
    btnFlash(randbtn);
}

function checkAns(idx){
    
    if (gameSeq[idx]==userSeq[idx]){
       if (userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
       }
       
    }
    else{
         if (maxScore<level-1){
            maxScore=level-1;
        }
        h3.innerHTML=`Game Over! <b>Your score was ${level-1}</b> <br><b>Your highest score till now is ${maxScore}</b> <br>  Press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150)
       
        setTimeout(reset,200);
    }

}

function btnPress(){
    if(!started){
        return;
    }
    let curbtn=this;
    userFlash(curbtn);
    userColor=curbtn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);

}

let allBtns=document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;

}

