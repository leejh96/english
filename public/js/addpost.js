const title = document.querySelector('#title');
const text = document.querySelector('#text');
const postCreate = document.querySelector('#postCreate');

postCreate.addEventListener('click', ()=>{
    if(!title.value){
        return alert('제목을 입력하세요');
    }
    if(!text.value){
        return alert('내용을 입력하세요');
    }
    const post = {
        title : title.value,
        text : text.value
    };
    fetch('/board', {
        method : "post",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(post)
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            location.href = '/board';
        }else{
            alert('글 작성을 실패하였습니다.');
            location.href = '/addpost';
        }
    })
});
