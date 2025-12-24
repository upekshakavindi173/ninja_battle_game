var attackSound = new Audio("attack.mp3");
var defSound = new Audio("def.mp3");
var winbg = new Audio("flute.m4a");
var kunaiSound = new Audio("kunai.mp3");
var swordSound = new Audio("sword.mp3");
var jumpSound = new Audio("jump.mp3");
var runSound = new Audio("run.mp3");
var bgMusic = new Audio("bg.mp3");
var dyingSound = new Audio("dying.mp3");
var clickSound = new Audio("click.mp3");

function bgm() {
    bgMusic.loop = true;
    bgMusic.volume = 0.5;
    bgMusic.play();
}

var idleNinjaNo = 0;
var idleNinjaWorker = 0;

function idleNinja() {

    idleNinjaWorker = setInterval(() => {

        idleNinjaNo = idleNinjaNo + 1;

        if (idleNinjaNo == 10) {
            idleNinjaNo = 0;
        }
        document.getElementById("ninja").src = "./idle" + idleNinjaNo + ".png";
    }, 150);
}

var runNinjaNo = 0;
var runNinjaWorker = 0;
var runNinjaLeft = 4;

function runNinja() {
    runSound.play();
    runNinjaWorker = setInterval(() => {

        clearInterval(idleNinjaWorker);
        runNinjaNo = runNinjaNo + 1;

        if (runNinjaNo == 10) {
            runNinjaNo = 0;
        }
        document.getElementById("ninja").src = "./run" + runNinjaNo + ".png";

        runNinjaLeft = runNinjaLeft + 0.5;

        document.getElementById("ninja").style.marginLeft = runNinjaLeft + "%";

        if (runNinjaLeft == 20) {
            clearInterval(runNinjaWorker);
            jumpNinja();
            runSound.pause();

        }
    }, 150);
}

var jumpNinjaNo = 0;
var jumpNinjaWorker = 0;
var jumpNinjaLeft = 0;
var jumpNinjaBottom = 10;

function jumpNinja() {
    jumpSound.play();
    jumpNinjaWorker = setInterval(() => {

        jumpNinjaNo = jumpNinjaNo + 2;
        if (jumpNinjaNo <= 5) {
            document.getElementById("ninja").src = "./jump" + jumpNinjaNo + ".png";
            jumpNinjaBottom = jumpNinjaBottom + 6;
            jumpNinjaLeft = jumpNinjaLeft + 4;
        }
        else if (jumpNinjaNo <= 10) {
            jumpNinjaBottom = jumpNinjaBottom - 2;
            jumpNinjaLeft = jumpNinjaLeft + 4;
        }
        document.getElementById("ninja").style.bottom = jumpNinjaBottom + "%";
        document.getElementById("ninja").style.left = jumpNinjaLeft + "%";

        if (jumpNinjaNo == 10) {
            clearInterval(jumpNinjaWorker);
            document.getElementById("ninja").src = "./idle0.png";
            jumpSound.pause();
        }
        attack();
    }, 150);
}


var kunaiNo = 0;
var kunaiWorkerNo = 0;
var kunaiCount = 0;

function kunaiAttack() {
    kunaiSound.play();
    kunaiWorkerNo = setInterval(() => {
        kunaiNo = kunaiNo + 1;
        if (kunaiNo == 10) {
            kunaiNo = 0;
            kunaiCount = kunaiCount + 1;

            if (kunaiCount == 15) {
                climb();
            }
            clearInterval(kunaiWorkerNo);
            kunaiWorkerNo = 0;
        }
        document.getElementById("ninja").src = "./kunai" + kunaiNo + ".png";
    }, 100);
}

var swordNo = 0;
var swordWorker = 0;
var swordCount = 0;
function sword() {
    swordSound.play();
    swordWorker = setInterval(() => {
        swordNo = swordNo + 1;
        if (swordNo == 10) {
            swordNo = 0;
            swordCount = swordCount + 1;
            if (swordCount == 15) {
                climb();
            }
            clearInterval(swordWorker);
            swordWorker = 0;
        }
        document.getElementById("ninja").src = "./ja" + swordNo + ".png";
    }, 100);
}

var climbNo = 0;
var climbWorker = 0;
function climb() {
    climbWorker = setInterval(() => {
        clearInterval(kunaiWorkerNo);
        clearInterval(swordWorker);
        clearInterval(timeWorker);
        deathGolem();
        swordSound.pause();
        kunaiSound.pause();
        climbNo = climbNo + 1;
        if (climbNo == 10) {
            climbNo = 0;
        }
        document.getElementById("ninja").src = "./climb" + climbNo + ".png";
        win();
    }, 150)
}
var deathNo = 0;
var deathWorker = 0;

function death() {
    deathWorker = setInterval(() => {
        clearInterval(kunaiWorkerNo);
        clearInterval(swordWorker);
        clearInterval(attackWorker);
        swordSound.pause();
        kunaiSound.pause();
        dyingSound.play();
        deathNo = deathNo + 1;
        if (deathNo < 10) {
            document.getElementById("ninja").src = "./dead" + deathNo + ".png";

        }
        else {
            document.getElementById("ninja").src = "./dead9.png";

            clearInterval(deathWorker);
            dyingSound.pause();
            defeat();
        }


    }, 200);
}

function start() {
    gameStart = true;
    document.getElementById("start").innerHTML = "Game Started";
    document.getElementById("start").style.backgroundColor = "rgba(64, 94, 231, 0.63)";

}
function changeText() {
    if (gameStart == false) {
        document.getElementById("start").innerHTML = "Press Enter key";
    }
}
function resetText() {
    if (gameStart == false) {
        document.getElementById("start").innerHTML = "Start";
    }
}

function restart() {
    clickSound.play();
    window.location.reload();
}

var time = 45;
var timeWorker = 0;
function timer() {
    timeWorker = setInterval(() => {
        time = time - 1;
        if (time == 0) {
            death();
            clearInterval(timeWorker);
            pause();
        }
        document.getElementById("time").innerHTML = "Time:" + time;
    }, 800);
}
function pause() {
    clickSound.play();
    clearInterval(attackWorker);
    clearInterval(idleNinjaWorker);
    clearInterval(runNinjaWorker);
    clearInterval(swordWorker);
    clearInterval(kunaiWorkerNo);
    clearInterval(jumpNinjaWorker);
    clearInterval(timeWorker);
    clearInterval(idleGolemWorker);
    clearInterval(runGolemWorker);
    clearInterval(jumpGolemWorker);
    kunaiSound.pause();
    swordSound.pause();
    jumpSound.pause();
    runSound.pause();


}

var scoreCount = 0;

function Score() {
    scoreCount = scoreCount + 30;
    document.getElementById("score").innerHTML = "Score:" + scoreCount;
}



var idleGolemNo = 0;
var idleGolemWorker = 0;

function idleGolem() {

    idleGolemWorker = setInterval(() => {

        idleGolemNo = idleGolemNo + 1;

        if (idleGolemNo == 10) {
            idleGolemNo = 1;
            clearInterval(idleGolemWorker);
            runGolem();

        }
        document.getElementById("golem").src = "./gidle" + idleGolemNo + ".png";
    }, 100);
}

var runGolemNo = 0;
var runGolemWorker = 0;
var runGolemRight = 4;

function runGolem() {

    runGolemWorker = setInterval(() => {

        clearInterval(idleGolemWorker);
        runGolemNo = runGolemNo + 1;

        if (runGolemNo == 18) {
            runGolemNo = 0;
        }
        document.getElementById("golem").src = "./walk" + runGolemNo + ".png";

        runGolemRight = runGolemRight + 0.5;

        document.getElementById("golem").style.marginRight = runGolemRight + "%";

        if (runGolemRight == 18) {
            clearInterval(runGolemWorker);
            jumpGolem();
        }
    }, 150);
}

var jumpGolemNo = 0;
var jumpGolemWorker = 0;
var jumpGolemRight = 0;
var jumpGolemBottom = 10;

function jumpGolem() {

    jumpGolemWorker = setInterval(() => {

        jumpGolemNo = jumpGolemNo + 2;
        if (jumpGolemNo <= 7) {
            document.getElementById("golem").src = "./gjump" + jumpGolemNo + ".png";
            jumpGolemBottom = jumpGolemBottom + 6;
            jumpGolemRight = jumpGolemRight + 4;
        }
        else if (jumpGolemNo <= 13) {
            jumpGolemBottom = jumpGolemBottom - 4;
            jumpGolemRight = jumpGolemRight + 3;
        }
        document.getElementById("golem").style.bottom = jumpGolemBottom + "%";
        document.getElementById("golem").style.right = jumpGolemRight + "%";

        if (jumpGolemNo == 14) {
            clearInterval(jumpGolemWorker);
            document.getElementById("golem").src = "./gjump0.png";


        }
    }, 200);
}

var attackNo = 0;
var attackWorker = 0;

function attack() {

    if (attackWorker == 0) {
        attackWorker = setInterval(() => {
            attackNo = attackNo + 1;
            if (attackNo == 7) {
                attackSound.play();
            }
            if (attackNo == 12) {

                attackNo = 0;

            }
            document.getElementById("golem").src = "./attack" + attackNo + ".png";

        }, 150);
    }
}

var deathGolemNo = 0;
var deathGolemWorker = 0;

function deathGolem() {
    clearInterval(attackWorker);

    deathGolemWorker = setInterval(() => {

        deathGolemNo = deathGolemNo + 1;
        if (deathGolemNo <= 10) {
            document.getElementById("golem").src = "./gdead" + deathGolemNo + ".png";

        }
        else {
            clearInterval(deathGolemWorker);
            deathGolemWorker = 0;
        }


    }, 200);
}



var gameStart = false;
var ninjaRun = false;
function Start(event) {
    bgm();
    if (event.code == "Enter" & idleNinjaWorker == 0) {
        gameStart = true;
        alert("Space key=>The ninja can run.; ArrowUp key=> Sword Attack.; ArrowDown Key=> Kunai Attack.If you want to win this game, you must use either THE SWORD ATTACK OR THE KUNAI ATTACK FIFTEEN TIMES before the allotted time run out.");
        timer();
        idleNinja();
        idleGolem();
        start();
    }
    if (gameStart == true) {
        if (event.code == "Space" & runNinjaWorker == 0) {
            runNinja();
            ninjaRun = true;
        }
        if (ninjaRun == true) {
            if (event.code == "ArrowDown" & kunaiWorkerNo == 0 & runNinjaLeft == 20) {
                kunaiAttack();
                Score();
            }
            if (event.code == "ArrowUp" & swordWorker == 0 & runNinjaLeft == 20) {
                sword();
                Score();
            }

        }
    }
}

function win() {
    winbg.play();
    winbg.volume = 0.5;
    clearInterval(kunaiWorkerNo);
    clearInterval(swordWorker);
    clearInterval(attackWorker);
    document.getElementById("win").style.display = "flex";
}

function defeat() {
    defSound.play();
    defSound.volume = 0.5;
    document.getElementById("defeat").style.display = "flex";
}