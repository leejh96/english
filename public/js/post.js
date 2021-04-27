"use strict";

const updateBtn = document.querySelectorAll('.updateBtn');
const updateForm = document.querySelectorAll('.updateForm');
const commentText = document.querySelector('#commentText');
const commentTextBtn = document.querySelector('#commentTextBtn');
const postId = document.location.pathname.split('/')[2];
const text = document.querySelectorAll('.text');
const commentId = document.querySelectorAll('.commentId');
const commentBtn = document.querySelectorAll('.commentBtn');

for(let i = 0; i< updateBtn.length; i++){
    updateForm[i].style.display = 'none';
    updateBtn[i].addEventListener('click', ()=>{
        if(updateBtn[i].value === '수정하기'){
            updateBtn[i].value = '닫기';
            updateForm[i].style.display = 'block';
        }else{
            updateBtn[i].value = '수정하기';
            updateForm[i].style.display = 'none';
            text[i].value = '';
        }
    });
}

const postUpdateBtn = document.querySelector('#postUpdateBtn');
const postUpdatetitle = document.querySelector('#postUpdatetitle');
const postUpdateText = document.querySelector('#postUpdateText');
const postEditBtn = document.querySelector('#postEditBtn');
const postUpdateForm = document.querySelector('#postUpdateForm');

postUpdateBtn.addEventListener('click',()=>{
    if(postUpdateForm.style.display === 'block'){
        postUpdateForm.style.display = 'none';
        postUpdateBtn.value = '수정';
    }else{
        postUpdateForm.style.display = 'block';
        postUpdateBtn.value = '닫기';
    }
});

postEditBtn.addEventListener('click', ()=>{
    if(!postUpdatetitle.value){
        return alert('제목을 입력하세요');
    }
    if(!postUpdateText.value){
        return alert('내용을 입력하세요');
    }
    const post = {
        title : postUpdatetitle.value,
        text : postUpdateText.value,
    };
    fetch(`/board/${postId}/edit`, {
        method : 'put',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(post)
    })
    .then(res => res.json())
    .then(res => {
        if (res.success){
            location.href = `/board/${postId}`;
        }else{
            alert('글 수정에 실패했습니다.');
            location.href = `/board/${postId}`;
        }
    })
});

commentTextBtn.addEventListener('click', ()=>{
    if(!commentText.value){
        alert('내용을 입력하세요');
    }else{
        const comment = {
            commentText : commentText.value
        };
        fetch(`/board/${postId}`, {
            method : 'post',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(comment)
        })
        .then(res => res.json())
        .then(res => {
            if(res.success){
                location.href = `/board/${postId}`
            }else{
                alert('댓글 작성을 실패했습니다');
                location.href = `/board/${postId}`
            }
        })
    }
});

for(let i = 0; i<commentBtn.length; i++){
    commentBtn[i].addEventListener('click', ()=>{
        if(!text[i].value){
            alert('댓글을 입력하세요');
        }else{
            const comment = {
                text : text[i].value,
                commentId : commentId[i].value
            }
            fetch(`/board/${postId}`, {
                method : 'put',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(comment)
            })
            .then(res => res.json())
            .then(res => {
                if(res.success){
                    location.href =`/board/${postId}`
                }else{
                    alert('댓글 수정에 실패했습니다.');
                }
            })
        }
    });
}