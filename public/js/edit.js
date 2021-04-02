"use strict";
const spelling = document.querySelector('#spelling');
const meaning = document.querySelector('#meaning');
const modifyBtn = document.querySelector('#modifyBtn');
const wordId = document.location.pathname.split('/')[2];
modifyBtn.addEventListener('click', ()=>{
    if(!spelling.value){
        return alert('단어를 입력하세요');
    }
    if(!meaning.value){
        return alert('뜻을 입력하세요');
    }
    const word = {
        spelling : spelling.value,
        meaning : meaning.value
    };
    fetch(`/myword/${wordId}`, {
        method : 'put',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(word)
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            location.href = `/myword/${wordId}`;
        }else{
            alert('값 수정을 실패하였습니다.');
            location.href = `/myword/${wordId}/edit`;
        }
    })
});