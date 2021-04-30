const title = document.querySelector('#title');
const text = document.querySelector('#text');
const postCreate = document.querySelector('#postCreate');
const fileBtn = document.querySelector('#fileBtn');

postCreate.addEventListener('click', ()=>{
    filename = fileBtn.files[0].name;
    console.log(fileBtn.files[0]);
    if(!title.value){
        return alert('제목을 입력하세요');
    }
    if(!text.value){
        return alert('내용을 입력하세요');
    }
    const post = {
        title : title.value,
        text : text.value,
        file : filename
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
            location.href = '/board/page/1';
        }else{
            alert('글 작성을 실패하였습니다.');
            location.href = '/addpost';
        }
    })
});