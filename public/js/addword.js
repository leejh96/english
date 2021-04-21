"use strict";
const spelling = document.querySelector('#spelling');
const meaning = document.querySelector('#meaning');
const Btn = document.querySelector('#Btn');
const categoryMenu = document.querySelector('#categoryMenu');


Btn.addEventListener('click', () =>{
    const category = categoryMenu.options[categoryMenu.selectedIndex].value;
    console.log(category);
    if(!spelling.value){
        return alert('단어를 입력하세요');
    }
    if(!meaning.value){
        return alert('뜻을 입력하세요');
    }
    if(category === 'none'){
        return alert('카테고리를 선택하세요');
    }
    const word = {
        spelling : spelling.value,
        meaning : meaning.value,
        category : categoryMenu.options[categoryMenu.selectedIndex].value
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
