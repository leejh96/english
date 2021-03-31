"use strict";

const usernick = document.getElementById('nick');
const id = document.getElementById('id');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const signupButton = document.getElementById('signupButton');
signupButton.addEventListener('click', () => {
    if ( !usernick.value ){
        alert('닉네임을 입력하세요');
    }else if( !id.value ){
        alert('아이디를 입력하세요')
    }else if( !password.value ){
        alert('비밀번호를 입력하세요');
    }else if ( !confirmPassword.value ){
        alert('비밀번호를 확인하세요');
    }else if (password.value !== confirmPassword.value){
        alert('입력한 비밀번호가 다릅니다');
    }else{
        const user = {
            nick : usernick.value,
            id : id.value,
            password : password.value,
        };
        fetch('/signup', {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                alert('회원가입 되었습니다. 다시 로그인 해주세요');
                location.href = '/login';
            }else{
                alert(res.message)
                location.href = '/signup';
            }
        })
    }
})
