"use strict"
const id = document.getElementById('loginId');
const password = document.getElementById('loginPassword');
const loginButton = document.getElementById('loginButton');

loginButton.addEventListener('click', ()=>{
    if(!id.value){
        alert('아이디를 입력하세요');
    }else if(!password.value){
        alert('비밀번호를 입력하세요');
    }else{
        const user = {
            id : id.value,
            password : password.value,
        }
        fetch('/login', {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                location.href = '/';
            }else{
                alert(res.message);
            }
        })
    }
});