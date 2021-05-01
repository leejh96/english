"use strict";
const webSocket = new WebSocket('ws://localhost:3000');
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const navbarMenu = document.querySelector('.navbar_menu');
const loginLinks = document.querySelector('.navbar_link');
const logout = document.querySelector('.navbar_logout');
const spelling = document.querySelector('#spelling');
const meaning = document.querySelector('#meaning');
const toTranslateText = document.querySelector('#toTranslateText');
const translatedText = document.querySelector('#translatedText');
const translateBtn = document.querySelector('#translateBtn');
const langSelect = document.querySelector('#langSelect');

translateBtn.addEventListener('click', ()=>{
    if(!toTranslateText.value){
        return alert('번역할 값을 입력하세요');
    }
    const body = {
        text : toTranslateText.value,
        source : 'en',
        target : 'ko'
    }
    if(langSelect.value === '영어') {
        body.source = 'ko',
        body.target = 'en'
    }
    fetch('/translate',{
        method : 'post',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(body)
    })
    .then(res => res.json())
    .then(res => JSON.parse(res))
    .then(res => {
        translatedText.value = res.message.result.translatedText;
    })
});
langSelect.addEventListener('click', ()=>{
    if(langSelect.value === '한국어'){
        langSelect.value = '영어';
        toTranslateText.placeholder = '한글을 입력하세요';
    }else{
        langSelect.value = '한국어';
        toTranslateText.placeholder = '영어을 입력하세요';
    }
});

webSocket.onmessage = (e) => {
    const words = JSON.parse(e.data);
    for(let i = 0; i< words.length; i++){
        setTimeout(() => {
            spelling.innerHTML = words[i].spelling;
            meaning.innerHTML = words[i].meaning;
        },3000*i);
    }
    setInterval(() => {
        for(let i = 0; i< words.length; i++){
            setTimeout(() => {
                spelling.innerHTML = words[i].spelling;
                meaning.innerHTML = words[i].meaning;
            },3000*i);
        }
    }, words.length*3000)
};

toggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('active');
    loginLinks.classList.toggle('active');
    logout.classList.toggle('active');
});
