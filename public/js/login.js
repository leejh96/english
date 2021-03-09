"use strict";

const id = document.querySelector('#loginId');
const password = document.querySelector('#loginPassword');
const loginButton = document.querySelector('#loginButton');

loginButton.addEventListener('click', () => {
    if (!id.value){
        alert('아이디를 입력하세요');
    }else if(!password.value){
        alert('비밀번호를 입력하세요');
    }else{
        const user = {
            id : id.value,
            password : password.value,
        };
        //전달할 데이터경로(url의 값을 넣는것, vscode내의 폴더경로x), 값
        fetch('/login', {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(user)
        })
        //res.json()의 반환값은 프로미스
            .then((res) => {return res.json()})
            .then((res) => {
                if (res.success){
                    location.href = '/';
                }else{
                    alert(res.message);
                }
            })  
            .catch((err)=>{
                console.error(err);
            })
    }
})

