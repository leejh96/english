"use strict";

const meanbox = document.querySelectorAll('.meanBox');
const confirmBtn = document.querySelectorAll('.confirmBtn');
const spell = document.querySelectorAll('.spelling');
const confirmBtnSquare = document.querySelectorAll('.confirmBtnSquare');
const meanboxSquare = document.querySelectorAll('.meanBoxSquare');

for(let i = 0; i< confirmBtn.length; i++){
    confirmBtn[i].addEventListener('click', () => {
        if(!meanbox[i].value){
            alert('뜻을 입력하세요');
        }else{
            const wordMeaning = {
                spelling : spell[i].innerText,
                meaning : meanbox[i].value
            };
            fetch('/repeat', {
                method : "post",
                headers : {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(wordMeaning)
            })
            .then(res => res.json())
            .then(res => {
                if(res.success){
                    confirmBtnSquare[i].innerHTML = 'O';
                    meanboxSquare[i].innerHTML = `${meanbox[i].value}`;
                }else{
                    meanbox[i].value = '';
                    confirmBtn[i].value = '재도전';
                }
            })
        }
    });
}
