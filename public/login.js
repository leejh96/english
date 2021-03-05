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
        const req = {
            id : id.value,
            password : password.value,
        };
        //전달할 데이터경로(url의 값을 넣는것, vscode내의 폴더경로x), 값
        fetch('/login', {
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(req)
        })
        //서버에서 온 응답이 json형식일 경우 프로미스를 사용
            .then((res, rej) => {
                console.log(res.body)
            })
            .then((res, rej) => {
                console.log(res);
            })
            .catch((rej) => {
                console.error(rej);
            })    
    }
})

