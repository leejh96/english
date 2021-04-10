"use strict"
const webSocket = new WebSocket('ws://localhost:3000/quiz');
const spelling = document.querySelector('#spelling');
const btn = document.querySelectorAll('.btn');
const correctCount = document.querySelector('#correctCount');
const restart = document.querySelector('#restart');
const timer = document.querySelector('#timer');

function spellingInput(answer, cnt){
    spelling.innerHTML = answer.spelling[cnt];
    return spelling.innerHTML;
}
function btnInput(answer, targetSpelling, btn){
    let useValue = []
    let i = 0;
    let idx = answer.spelling.indexOf(targetSpelling);
    while(i < 4){
        let randomValue = Math.floor(Math.random()*answer.index.length);
        if(i === 3 && !useValue.includes(idx)){
            btn[i].value = answer.meaning[idx];
            useValue.push(idx);
            break;
        }
        if(!useValue.includes(randomValue)){
            btn[i].value = answer.meaning[randomValue];
            useValue.push(randomValue);
            i += 1; 
        }
    }
    return useValue;
}
function btnEvnet(answer, quizCnt, targetSpelling, useValue){
    let idx = answer.spelling.indexOf(targetSpelling);
    let count = 0;
    for(let i = 0; i < 4; i++){
        btn[i].addEventListener('click',()=>{
            if(idx === useValue[i]){
                count += 1;
                correctCount.innerHTML = `맞춘 갯수 : ${count} / ${quizCnt}`
            } 
        });
    }
    return count;
}
function timerValue(time){
    for(let i = 0; i <5; i++){
        setTimeout(() => {
            time = parseInt(time);
            timer.innerHTML = time;
            time -= 1;
        }, i* 1000);
    }
};

function randomEnglish(answer, quizCnt, words){
    let i = 0;
    while(i !== quizCnt)
    {
        let randomNumber = Math.floor(Math.random()*words.length); //0123
        if(!answer.index.includes(randomNumber)){  //randomindex에 없나?
            answer.index.push(randomNumber);// 그렇다면 randomindex에 넣자
            answer.spelling.push(words[randomNumber].spelling);
            answer.meaning.push(words[randomNumber].meaning);
            i++;
        }
    }
    return answer;
}
webSocket.onmessage = (e)=>{
    const words = JSON.parse(e.data);
    let answer = { 
        index : [],
        spelling : [],
        meaning : []
    };
    let quizCnt = 10;
    if (words.length < quizCnt){
        quizCnt = words.length;
    }
    answer = randomEnglish(answer, quizCnt, words);
    for(let cnt = 0; cnt < quizCnt; cnt++){
        const st = setTimeout(()=> {
            let time = 5;
            let targetSpelling = '';
            let useValue = [];
            let cou = 0;
            timerValue(time);
            targetSpelling = spellingInput(answer, cnt);
            useValue = btnInput(answer, targetSpelling, btn);
            btnEvnet(answer, quizCnt, targetSpelling, useValue);
        }, cnt* 5000);
    }
    
};
restart.addEventListener('click', ()=>{
    location.href = '/quiz';
});


