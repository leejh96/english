"use strict";

const listnick = document.querySelector('#listnick');
const listpassword = document.querySelector('#listpassword');
const listwithdrawal = document.querySelector('#listwithdrawal');
const nickChange = document.querySelector('#nickChange');
const passwordChange = document.querySelector('#passwordChange');
const withdrawal = document.querySelector('#withdrawal');
const updateTitle = document.querySelector('#updateTitle');
const nickregister = document.querySelector('#nickregister');
const passwordRegister = document.querySelector('#passwordregister');
const withdrawalBtn = document.querySelector('#withdrawalBtn');
const nickname = document.querySelector('#nickname');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const currentPassword = document.querySelector('#currentPassword');

listnick.addEventListener('click', ()=>{
    nickChange.style.display = 'block';
    passwordChange.style.display = 'none';
    withdrawal.style.display = 'none';
    updateTitle.innerHTML = '<label>닉네임 변경</label>'
});

listpassword.addEventListener('click', ()=>{
    passwordChange.style.display = 'block';
    nickChange.style.display = 'none';
    withdrawal.style.display = 'none';

    updateTitle.innerHTML = '<label>비밀번호 변경</label>'
});

listwithdrawal.addEventListener('click', ()=>{
    withdrawal.style.display = 'block';
    passwordChange.style.display = 'none';
    nickChange.style.display = 'none';

    updateTitle.innerHTML = '<label>회원 탈퇴</label>'
});

nickregister.addEventListener('click', ()=>{
    fetch('/setting/nick', {
        method : 'put',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            nick : nickname.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            alert('닉네임 변경이 완료되었습니다.');
            return location.href = '/setting';
        }
    })
});

passwordRegister.addEventListener('click', ()=>{
    if(password.value !== passwordConfirm.value){
        return alert('변경할 비밀번호가 다릅니다.')
    }
    fetch('/setting/password', {
        method : 'put',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            password : password.value,
            currentPassword : currentPassword.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            alert('변경한 비밀번호로 로그인 하시기 바랍니다');
            return location.href = '/logout';
        }else{
            return alert(res.message);
        }
    })
});

withdrawalBtn.addEventListener('click', ()=> {
    const password = prompt('비밀번호를 입력하세요');
    fetch('/setting/signout', {
        method : 'delete',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            password
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            alert('회원탈퇴가 완료되었습니다');
            return location.href = '/';
        }else{
            return alert(res.message);
        }
    })
});