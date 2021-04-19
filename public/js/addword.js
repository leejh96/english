const spelling = document.querySelector('#spelling');
const meaning = document.querySelector('#meaning');
const Btn = document.querySelector('#Btn');

Btn.addEventListener('click', () =>{
    if(!spelling.value){
        return alert('단어를 입력하세요');
    }
    if(!meaning.value){
        return alert('뜻을 입력하세요');
    }
    const word = {
        spelling : spelling.value,
        meaning : meaning.value
    };
    fetch('/myword', {
        method :'post',
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(word)
    })
    .then(res => res.json())
    .then(res => {
        if(res.success){
            location.href = `/myword/page/1`;
        }else{
            alert(res.message);
            location.href = '/addword';
        }
    })
});
