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
const updateUploadBtn = document.querySelector('#updateUploadBtn');
postUpdateBtn.addEventListener('click',()=>{
    if(postUpdateForm.style.display === 'block'){
        postUpdateForm.style.display = 'none';
        postUpdateBtn.value = '수정';
    }else{
        postUpdateForm.style.display = 'block';
        postUpdateBtn.value = '닫기';
    }
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
postEditBtn.addEventListener('click', ()=>{
    const postId = document.location.pathname.split('/')[2];
    const formData = new FormData();
    const file = document.querySelector('#updateUploadBtn').files[0];
    if(!postUpdatetitle.value){
        return alert('제목을 입력하세요');
    }
    formData.append('title', postUpdatetitle.value);
    formData.append('text', postUpdateText.value);
    formData.append('file', file);
    fetch(`/board/${postId}/edit`, {
        method : 'put',
        body : formData
    })
    .then(res => res.json())
    .then(res => {
        if(!res.success){
            return alert('에러가 발생했습니다. 다시 시도해주세요');
        }else{
            return location.href = `/board/${postId}`
        }
    })
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
const img = document.querySelector('#img');
if(img){
    img.addEventListener('click', ()=>{
        if(img.width === 200){
            img.width = "400";
            img.height = "400";
        }else{
            img.width = "200";
            img.height = "200";
        }
    })
}