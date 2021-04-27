"use strict";
const meanbox = document.querySelectorAll('.meanBox');
const confirmBtn = document.querySelectorAll('.confirmBtn');
const spell = document.querySelectorAll('.spelling');
const confirmBtnSquare = document.querySelectorAll('.confirmBtnSquare');
const meanboxSquare = document.querySelectorAll('.meanBoxSquare');

const spellBox = document.querySelectorAll('.spellBox');
const spellBoxSquare = document.querySelectorAll('.spellBoxSquare');
const meaning = document.querySelectorAll('.meaning');
const confirmBtn2 = document.querySelectorAll('.confirmBtn2');
const confirmBtnSquare2 = document.querySelectorAll('.confirmBtnSquare2');
const wordTable = document.querySelector('.wordTable');

if(spell.length === 0){
    wordTable.style.fontSize = '2rem';
    wordTable.style.textAlign = 'center';
    wordTable.innerHTML = '<label>단어를 한 개 이상 등록하세요</label>'
}

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

for(let i = 0; i< confirmBtn2.length; i++){
    confirmBtn2[i].addEventListener('click', () => {
        if(!spellBox[i].value){
            alert('단어를 입력하세요');
        }else{
            const wordMeaning = {
                spelling : spellBox[i].value,
                meaning : meaning[i].innerText,
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
                    confirmBtnSquare2[i].innerHTML = 'O';
                    spellBoxSquare[i].innerHTML = `${spellBox[i].value}`;
                }else{
                    spellBox[i].value = '';
                    confirmBtn2[i].value = '재도전';
                }
            })
        }
    });
}