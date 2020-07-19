// 1. generates random number from 1 to 20
// and calculate score
var random_number;
function generate_random_number () {
    random_number = Math.floor(Math.random()*20)+1;
    setTimeout(calculate_score,1990);
}



// 2. random number returns "mission sentence", and innerHTML this
var mission_sentence;
function generate_mission() {
    switch(random_number) {
        // 청기 올려
        case 1: mission_sentence = "청기 올려"; break;
        case 2: mission_sentence = "청기 올리고, 백기 올리지마"; break;
        case 3: mission_sentence = "청기 올리고, 백기 내리지마"; break;
        case 4: mission_sentence = "백기 올리지 말고, 청기 올려"; break;
        case 5: mission_sentence = "백기 내리지 말고, 청기 올려"; break;
    
        // 청기 내려
        case 6: mission_sentence = "청기 내려"; break;
        case 7: mission_sentence = "청기 내리고, 백기 올리지마"; break;
        case 8: mission_sentence = "청기 내리고, 백기 내리지마"; break;
        case 9: mission_sentence = "백기 올리지 말고, 청기 내려"; break;
        case 10: mission_sentence = "백기 내리지 말고, 청기 내려"; break;
    
        // 백기 올려
        case 11: mission_sentence = "백기 올려"; break;
        case 12: mission_sentence = "백기 올리고, 청기 올리지마"; break;
        case 13: mission_sentence = "백기 올리고, 청기 내리지마"; break;
        case 14: mission_sentence = "청기 올리지 말고, 백기 올려"; break;
        case 15: mission_sentence = "청기 내리지 말고, 백기 올려"; break;
    
        // 백기 내려
        case 16: mission_sentence = "백기 내려"; break;
        case 17: mission_sentence = "백기 내리고, 청기 올리지마"; break;
        case 18: mission_sentence = "백기 내리고, 청기 내리지마"; break;
        case 19: mission_sentence = "청기 올리지 말고, 백기 내려"; break;
        case 20: mission_sentence = "청기 내리지 말고, 백기 내려"; break;    
    }
    document.getElementById('mission').innerHTML = mission_sentence;
}



// 3. click the button, return parameter
// then, change the image
var result_click;
function clickButton(parameter) {            
    result_click = parameter;
    beep.play();

    switch(result_click) {
        case 1 : document.getElementsByClassName('character')[0].firstElementChild.src="img/character_blue_up.png"; break;
        case 2 : document.getElementsByClassName('character')[0].firstElementChild.src="img/character_white_up.png"; break;
        case 3 : document.getElementsByClassName('character')[0].firstElementChild.src="img/character_blue_down.png"; break;
        case 4 : document.getElementsByClassName('character')[0].firstElementChild.src="img/character_white_down.png"; break;
    }    
}



// 4. calculate score
// and if you fails mission, turn decrease (total of 3 chances)
var score=0;
var round=1;
var myLife = 5;
var flagState;

function calculate_score() {
    round++;
    
    // 청기 올려
    if(1 <= random_number && random_number <= 5) {
        if (result_click == 1) {score+=1;}
        else {score-=1;}
        flagState = 1;
    }
    
    // 청기 내려
    if(6 <= random_number && random_number <= 10) {
        if (result_click == 3) {score+=1;}
        else {score-=1;}
        flagState = 3;
    }

    // 백기 올려
    if(11 <= random_number && random_number <= 15) {
        if (result_click == 2) {score+=1;}
        else {score-=1;}
        flagState = 2;
        
    }

    // 백기 내려
    if(16 <= random_number && random_number <= 20) {
        if (result_click == 4) {score+=1;}
        else {score-=1;}
        flagState = 4;
    }
    document.getElementById('score').innerHTML = score;
    document.getElementById('round').innerHTML = `${round} Round`;

    
    // control the chances
    if(result_click !== flagState) {
        myLife -= 1;
        if(myLife >= 0) {
            document.getElementsByClassName("heart")[myLife].style = "display:none"
        }        
    }
    // situation game over
    if(myLife <= 0 && score < 0) { 
        document.getElementById('ready').innerHTML="GAME OVER";
        over.play();
        clickStop();
        document.getElementById('round').innerHTML = `${round} Round`;
        document.getElementsByClassName('start')[0].removeEventListener("click",clickStart);
        document.getElementById('mission').innerHTML = "GAME OVER. 계속하려면 리셋버튼을 눌러주세요";
        document.getElementById('mission').style="font-size:1.8rem;";
    }


    // reset initial state
    document.getElementsByClassName('character')[0].firstElementChild.src="img/start.png";
    
    result_click = undefined;   
}



// 5. progress bar
function proceed_progressBar () {
    document.getElementsByClassName('progress')[0].style="width:100%; transition:width 1.9s linear;";
    setTimeout(function() {
        document.getElementsByClassName('progress')[0].style="width:0";
    },1901);
}



// 6. click the start button, stop button
// then, set and clear interval that generate random number, generate mission
var interval_generate_random_number, interval_generate_mission, progress_bar;

function clickStart() {    
    interval_generate_random_number = setInterval(generate_random_number,2000);
    interval_generate_mission = setInterval(generate_mission,2000);
    
    // countdown 2,1,""
    document.getElementById('ready').innerHTML=2;
    setTimeout(function(){
        document.getElementById('ready').innerHTML=1;
    },1000);
    setTimeout(function(){
        document.getElementById('ready').innerHTML="";
    },2000);
    
    // proceed progress bar during 2seconds  
    progress_bar = setInterval(proceed_progressBar,2000)
    setTimeout(function() {
        document.getElementsByClassName('timebar')[0].style="border:1px solid black;";
    },2000);

    // display setting game played
    bgm.play();
    setTimeout(function() {
        document.getElementById('round').style="display:block;";
    },2000)
        
    // remove start button, add stop button
    document.getElementsByClassName('start')[0].removeEventListener("click",clickStart);
    document.getElementsByClassName('stop')[0].addEventListener("click",clickStop);
}

function clickStop() {    
    clearInterval(interval_generate_random_number);
    clearInterval(interval_generate_mission);
    
    // even if click the stop button, interval funcuntion already worked. 
    // so, score & chances will minus.
    // therefore, score and chances plus 1 by force
    round -= 1;
    score += 1;
    if(myLife>0) {myLife += 1}
    
    // reset initial state
    clearInterval(progress_bar);
    document.getElementsByClassName('timebar')[0].style="border:none;"; 
    document.getElementsByClassName('progress')[0].style="width:0;";
    document.getElementById('mission').innerHTML = "게임을 다시 시작해주세요";
    bgm.pause();

    // remove stop button, add start button
    document.getElementsByClassName('stop')[0].removeEventListener("click",clickStop);
    document.getElementsByClassName('start')[0].addEventListener("click",clickStart);
}

function clickReset() {
    location.reload();   
}

window.onload = function() {
    document.getElementsByClassName('start')[0].addEventListener("click",clickStart);
}



// 7. Audio
var bgm = new Audio();
var bg_sound = Math.floor(Math.random()*3)+1;
bgm.src = "img/bgm_0" + bg_sound + ".mp3";
bgm.volume = "0.3";

var beep = new Audio();
beep.src = "img/beep.mp3";
bgm.volume = "0.3";

var over = new Audio();
over.src = "img/over.mp3";
over.volume = "0.3";