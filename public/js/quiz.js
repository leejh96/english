const webSocket = new WebSocket('ws://localhost:3000/quiz');
const spelling = document.querySelector('#spelling');
const btn = document.querySelectorAll('.btn');
const correctCount = document.querySelector('#correctCount');
webSocket.onmessage = (e)=>{
    const words = JSON.parse(e.data);
    let randomIndex = []
    let cnt = 1
    let quizCnt = 10;
    let count = 0;
    while(cnt !== 10){
        while(randomIndex.length !== 4)
        {
            let randomNumber = Math.floor(Math.random()*words.length);
            if(!randomIndex.includes(randomNumber)){
                randomIndex.push(randomNumber);
            }
        }
        spelling.innerHTML = words[randomIndex[0]].spelling;
        let useValue = [];
        let i = 0
        while (useValue.length !== 4){
            let randomValue = Math.floor(Math.random()*randomIndex.length);//0123
            if(!useValue){
                btn[i].value = words[randomValue].meaning;
                i += 1
                useValue.push(randomValue);

            }else{
                if(!useValue.includes(randomValue)){
                    btn[i].value = words[randomValue].meaning;
                    i += 1
                    useValue.push(randomValue);
                }

            }
        }

        correctCount.innerHTML = `맞춘 갯수 : ${count} / ${quizCnt}`
        for(let i = 0; i<4; i++){
            btn[i].addEventListener('click',()=>{ 
                if(spelling.innerHTML === words[randomIndex[0]].spelling &&
                    btn[i].value === words[randomIndex[0]].meaning ){
                    count += 1
                    correctCount.innerHTML = `맞춘 갯수 : ${count} / ${quizCnt}`
                }
            });
        }
        cnt += 1
    }
    if(count > 7){
        alert('잘하시네요');
        location.href= '/quiz'
    }else if(count > 4){
        alert('보통입니다');
        location.href= '/quiz'

    }else{
        alert('분발하세요');
        location.href= '/quiz'
    }
};