"use strict";

const webSocket = new WebSocket('ws://localhost:3000');
const toggleBtn = document.querySelector('.navbar_toggleBtn');
const navbarMenu = document.querySelector('.navbar_menu');
const loginLinks = document.querySelector('.navbar_link');
const logout = document.querySelector('.navbar_logout');

const spelling = document.querySelector('#spelling');
const meaning = document.querySelector('#meaning');
webSocket.onmessage = (e) => {
    const words = JSON.parse(e.data);
    for(let i = 0; i< words.length; i++){
        setTimeout(() => {
            spelling.innerHTML = words[i].spelling;
            meaning.innerHTML = words[i].meaning;
        },1000*i);
    }
};
webSocket.onclose = ()=>{
    console.log('연결해제')
};

toggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('active');
    loginLinks.classList.toggle('active');
    logout.classList.toggle('active');
});

// setInterval(()=>{

// }, 10000)





