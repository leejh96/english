const webSocket = new WebSocket('ws://localhost:3000/quiz');
const spelling = document.querySelector('#spelling');
const btn = document.querySelectorAll('.btn');
const correctCount = document.querySelector('#correctCount');
const restart = document.querySelector('#restart');
const timer = document.querySelector('#timer');

let randomIndex = []
let quizCnt = 10;

function spellingInput(words, randomIndex, cnt){
    spelling.innerHTML = words[randomIndex[cnt]].spelling;    
}
function btnInput(words, randomIndex, btn, quizCnt){
    let i = 0;
    let useValue = [];
    while (useValue.length !== quizCnt){
        let randomValue = Math.floor(Math.random()*randomIndex.length);
        if(!useValue.includes(randomValue)){
            btn[i].value = words[randomValue].meaning;
            i += 1
            useValue.push(randomValue);
        }
    }
}
function btnEvnet(quizCnt, settimeout){
    let count = 0
    for(let j = 0; j<4; j++){
        btn[j].addEventListener('click',()=>{ 
            count += 1
            correctCount.innerHTML = `맞춘 갯수 : ${count} / ${quizCnt}`
            clearTimeout(settimeout);
        });
    }
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

function randomEnglish(randomIndex, quizCnt, words){
    while(randomIndex.length !== quizCnt)
    {
        let randomNumber = Math.floor(Math.random()*words.length); //0123
        if(!randomIndex.includes(randomNumber)){  //randomindex에 없나?
            randomIndex.push(randomNumber);// 그렇다면 randomindex에 넣자
        }
    }
    return randomIndex;
}
webSocket.onmessage = (e)=>{
    const words = JSON.parse(e.data);
    let time = 5;
    timer.innerHTML = time;
    if (words.length < quizCnt){
        quizCnt = words.length;
    }
    randomIndex = randomEnglish(randomIndex, quizCnt, words);
    for(let cnt = 0; cnt < quizCnt; cnt++){
        const settimeout = setTimeout(()=> {
            spellingInput(words, randomIndex, cnt);
            btnInput(words, randomIndex, btn, quizCnt);
            btnEvnet(quizCnt, settimeout);
            timerValue(time);
        }, cnt* 5000);
    }
};
restart.addEventListener('click', ()=>{
    location.href = '/quiz';
});


