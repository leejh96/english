"use strict"
const webSocket = new WebSocket('ws://localhost:3000/quiz');
const spelling = document.querySelector('#spelling');
const btn = document.querySelectorAll('.btn');
const correctCount = document.querySelector('#correctCount');
const restart = document.querySelector('#restart');
const timer = document.querySelector('#timer');
const btnSet = document.querySelector('#btnSet');
const wordTable = document.querySelector('#wordTable');
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
    return idx;
}
function timerValue(time){
    for(let i = 0; i <5; i++){
        setTimeout(() => {
            timer.innerHTML = time;
            time -= 1;
        }, i* 1000);
    }
    btnSet.disabled= false;
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
    if(words.length < 10){
        wordTable.style.textAlign = 'center';
        wordTable.style.fontSize = '2rem';
        return wordTable.innerHTML = "단어를 10개이상 등록하세요";
    }
    let answer = { 
        index : [],
        spelling : [],
        meaning : []
    };
    let quizCnt = 10;
    let count = 0;
    if (words.length < quizCnt){
        quizCnt = words.length;
    }
    let idx = -1
    answer = randomEnglish(answer, quizCnt, words);
    for(let cnt = 0; cnt < quizCnt; cnt++){
        let targetSpelling = answer.spelling[cnt];
        setTimeout(()=> {
            let time = 5;
            timerValue(time);
            targetSpelling = spellingInput(answer, cnt);
            idx = btnInput(answer, targetSpelling, btn);
        }, cnt* 5000);
    }
    for(let i = 0; i<4; i++){
        btn[i].addEventListener('click', ()=>{
            if(btn[i].value === answer.meaning[idx]){
                count += 1;
                correctCount.innerHTML = `맞춘 갯수 : ${count} / ${quizCnt}`;
                btnSet.disabled = true;
            }
            else{
                correctCount.innerHTML = '틀렸습니다';
                btnSet.disabled = true;
            }
        });
    }
    setTimeout(()=>{
        if(count === quizCnt){
            alert('만점입니다. 축하드려요!');
        }else if(count > parseInt(quizCnt/3)*2){
            alert(`${count}개 맞았습니다. 훌륭해요!`);
        }else if(count > parseInt(quizCnt/3)){
            alert(`${count}개 맞았습니다. 조금만 더 노력하세요!`);
        }else{
            alert(`${count}개 맞았습니다. 아직 많이 부족하세요..`);
        }
    }, 5000 * quizCnt);

};

