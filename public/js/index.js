"use strict";

const toggleBtn = document.querySelector('.navbar_toggleBtn');
const navbarMenu = document.querySelector('.navbar_menu');
const loginLinks = document.querySelector('.navbar_link');
const logout = document.querySelector('.navbar_logout');

const spelling = document.querySelector('#spelling');
const meaning = document.querySelector('#meaning');
toggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('active');
    loginLinks.classList.toggle('active');
    logout.classList.toggle('active');
});
let interval = 0
for(let i = 1; i<10; i++){
    interval = interval + 1000* i;
    setInterval(() => {
        let timeout = 1000* i;
        setTimeout(()=>{
            console.log(i);
            spelling.innerHTML = i;
            meaning.innerHTML = i;
        }, timeout)
    }, interval);
}


