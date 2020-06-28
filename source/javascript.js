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



// 3. click the start button, stop button
// then, set and clear interval that generate random number, generate mission
var interval_generate_random_number, interval_generate_mission;
function clickStart() {    
    interval_generate_random_number = setInterval(generate_random_number,2000);
    interval_generate_mission = setInterval(generate_mission,2000);
}

function clickStop() {    
    clearInterval(interval_generate_random_number);
    clearInterval(interval_generate_mission);   
    document.getElementById("penguin").src = "img/basic.svg" 
}



// 4. click the button, return parameter
var result_click;
function clickButton(parameter) {            
    result_click = parameter;
    if(parameter == 1 || parameter == 4){
        document.getElementById("penguin").src = "img/blueflag_up.svg"
    }
    if(parameter == 2 || parameter == 3){
        document.getElementById("penguin").src = "img/whiteflag_up.svg"
    }
}



// 5. calculate score
var score=0;
var myLife = 3;
var flagState;
function calculate_score() {
    // 청기 올려
    if(1 <= random_number && random_number <= 5) {
        if (result_click == 1) {score+=1;}
        else {score-=1;};
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
        else {score-=1;};
        flagState = 2;
    }

    // 백기 내려
    if(16 <= random_number && random_number <= 20) {
        if (result_click == 4) {score+=1;}
        else {score-=1;};
        flagState = 4;
    }
    document.getElementById('score').innerHTML = `점수 : ${score}`;
    document.getElementById("penguin").src = "img/basic.svg"

    if(result_click !== flagState) {
        myLife = myLife - 1;
        document.getElementsByClassName("heart")[myLife].style = "display:none"
        console.log("myLife" + myLife)
        console.log("flagstate" + flagState)
        console.log("result_click" + result_click)
    }

    if(myLife == 0) {
        if(confirm("다시 하시겠습니까?")){ // 확인을 누를 경우 페이지 새로고침
            location.reload(); //페이지 새로고침
        }
        else {// 취소를 누르면 점수를 알려주고 다시 새로고침 -> 목숨(기회)을 3번으로 만들어서 3번 실패하면 나오게 변경예정
            alert("당신의 점수는 " + (score+1) + "점 입니다. " + "다시 한번 도전해 보세요!");
            location.reload(); //페이지 새로고침
        }
    }
}
