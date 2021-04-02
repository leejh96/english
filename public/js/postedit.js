const title = document.querySelector('#title');
const text = document.querySelector('#text');
const postEditBtn = document.querySelector('#postEdit');
const postId = document.location.pathname.split('/')[2];
postEditBtn.addEventListener('click', ()=>{
    if(!title.value){
        return alert('제목을 입력하세요');
    }
    if(!text.value){
        return alert('내용을 입력하세요');
    }
    const post = {
        title : title.value,
        text : text.value,
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
            location.href = `/board/${postId}/edit`;
        }
    })
});