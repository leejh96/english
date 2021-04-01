"use strict";

const updateBtn = document.querySelectorAll('.updateBtn');
const updateForm = document.querySelectorAll('.updateForm');
console.log(updateBtn, updateForm);

for(let i = 0; i< updateBtn.length; i++){
    updateBtn[i].addEventListener('click', ()=>{
        if(updateForm[i].style.display === 'block'){
            updateBtn[i].innerText = '수정하기';
            updateForm[i].style.display = 'none';
        }else{
            updateBtn[i].innerText = '닫기';
            updateForm[i].style.display = 'block';
        }
    });
}
