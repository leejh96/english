"use strict";

const toggleBtn = document.querySelector('.navbar_toggleBtn');
const navbarMenu = document.querySelector('.navbar_menu');
const loginLinks = document.querySelector('.navbar_link');

toggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('active');
    loginLinks.classList.toggle('active');
});