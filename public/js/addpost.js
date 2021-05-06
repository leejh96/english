const title = document.querySelector('#title');
const text = document.querySelector('#text');
const postCreate = document.querySelector('#postCreate');
const fileBtn = document.querySelector('#fileBtn');
const formData = new FormData();
const formDataUpload = new FormData();
postCreate.addEventListener('click', ()=>{
    let filename = fileBtn.files[0];
    if(!title.value){
        return alert('제목을 입력하세요');
    }

    formData.append('title', title.value);
    formData.append('text', text.value)
    formData.append('file', filename);
    fetch('/board', {
        method : "post",
        body : formData
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